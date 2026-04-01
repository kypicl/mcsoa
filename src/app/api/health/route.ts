import { getPayload } from 'payload'
import configPromise from '@payload-config'
import fs from 'fs'

/**
 * GET /api/health
 *
 * Lightweight health check that tests database connectivity by running a
 * minimal Payload query. Returns structured JSON so the response is easy to
 * read in Railway logs or a browser.
 *
 * Possible outcomes:
 *   200 { status: "ok",    db: "connected", ... }
 *   500 { status: "error", db: "failed",    error: "<message>" }
 */
export async function GET(): Promise<Response> {
  const databaseUrl = process.env.DATABASE_URL ?? 'file:/data/mcsoa.db'
  const dbFilePath = databaseUrl.replace(/^file:/, '')

  // ── 1. File-system check ──────────────────────────────────────────────────
  let fileInfo: Record<string, unknown> = { path: dbFilePath }
  try {
    const stat = fs.statSync(dbFilePath)
    fileInfo = {
      path: dbFilePath,
      exists: true,
      sizeBytes: stat.size,
      mode: stat.mode.toString(8),
      modifiedAt: stat.mtime.toISOString(),
    }
  } catch (fsErr: unknown) {
    fileInfo = {
      path: dbFilePath,
      exists: false,
      error: fsErr instanceof Error ? fsErr.message : String(fsErr),
    }
  }

  // ── 2. Payload / database connectivity check ──────────────────────────────
  let dbStatus: 'connected' | 'failed' = 'failed'
  let dbError: string | undefined
  let collectionCount: number | undefined

  try {
    const payload = await getPayload({ config: configPromise })

    // Run a cheap query — just count pages with limit 0 to avoid loading data
    const result = await payload.find({
      collection: 'pages',
      limit: 0,
      pagination: false,
    })

    dbStatus = 'connected'
    collectionCount = result.totalDocs
    console.log('[health] DB connectivity check passed, totalDocs(pages):', collectionCount)
  } catch (dbErr: unknown) {
    dbError = dbErr instanceof Error ? dbErr.message : String(dbErr)
    const stack = dbErr instanceof Error ? dbErr.stack : undefined
    console.error('[health] DB connectivity check FAILED:', dbError)
    if (stack) console.error(stack)
  }

  // ── 3. Build response ─────────────────────────────────────────────────────
  const ok = dbStatus === 'connected'
  const body = {
    status: ok ? 'ok' : 'error',
    db: dbStatus,
    ...(dbError ? { error: dbError } : {}),
    ...(collectionCount !== undefined ? { pagesCount: collectionCount } : {}),
    file: fileInfo,
    databaseUrl,
    timestamp: new Date().toISOString(),
  }

  return new Response(JSON.stringify(body, null, 2), {
    status: ok ? 200 : 500,
    headers: { 'Content-Type': 'application/json' },
  })
}
