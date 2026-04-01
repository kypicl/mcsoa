/**
 * Next.js Instrumentation Hook
 * https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 *
 * This file runs once when the Next.js server starts (before any requests are
 * handled). We use it to eagerly initialise Payload and surface any database
 * errors in the deployment logs rather than letting them fail silently on the
 * first HTTP request.
 */
export async function register() {
  // Only run in the Node.js runtime (not in the Edge runtime or during build)
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  if (process.env.NEXT_PHASE === 'phase-production-build') return

  console.log('[instrumentation] Server starting — running Payload startup diagnostics')

  try {
    // Dynamically import to avoid pulling this into the Edge bundle
    const { getPayload } = await import('payload')
    const { default: configPromise } = await import('@payload-config')

    console.log('[instrumentation] Initialising Payload...')
    const payload = await getPayload({ config: configPromise })
    console.log('[instrumentation] Payload initialised successfully')

    // Run a cheap connectivity probe so we know the DB is reachable
    try {
      const result = await payload.find({
        collection: 'pages',
        limit: 0,
        pagination: false,
      })
      console.log(
        '[instrumentation] DB connectivity probe passed — pages collection has',
        result.totalDocs,
        'documents',
      )
    } catch (queryErr: unknown) {
      const msg = queryErr instanceof Error ? queryErr.message : String(queryErr)
      const stack = queryErr instanceof Error ? queryErr.stack : undefined
      console.error('[instrumentation] DB connectivity probe FAILED:', msg)
      if (stack) console.error(stack)
    }
  } catch (initErr: unknown) {
    const msg = initErr instanceof Error ? initErr.message : String(initErr)
    const stack = initErr instanceof Error ? initErr.stack : undefined
    console.error('[instrumentation] FATAL: Payload failed to initialise:', msg)
    if (stack) console.error(stack)
    // Do NOT re-throw — we want the server to stay up so the health endpoint
    // can still respond and report the error.
  }
}
