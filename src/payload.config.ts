import { sqliteAdapter } from '@payloadcms/db-sqlite'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import fs from 'fs'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Members } from './collections/Members'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// ---------------------------------------------------------------------------
// Database diagnostics — logged at config evaluation time so any file-system
// or permission problem is visible in the deployment logs before the first
// HTTP request arrives.
// ---------------------------------------------------------------------------
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build'
const databaseUrl = isBuildPhase
  ? 'file:/tmp/payload.db'
  : (process.env.DATABASE_URL ?? 'file:/data/mcsoa.db')

console.log('[payload.config] DATABASE_URL env:', process.env.DATABASE_URL ?? '(not set)')
console.log('[payload.config] Resolved database URL:', databaseUrl)
console.log('[payload.config] NEXT_PHASE:', process.env.NEXT_PHASE ?? '(not set)')

// Inspect the SQLite file on disk so we can detect missing/empty/unreadable DB
if (!isBuildPhase) {
  const dbFilePath = databaseUrl.replace(/^file:/, '')
  try {
    const stat = fs.statSync(dbFilePath)
    console.log(
      `[payload.config] DB file found: ${dbFilePath} (${stat.size} bytes, mode ${stat.mode.toString(8)})`,
    )
  } catch (statErr: unknown) {
    const msg = statErr instanceof Error ? statErr.message : String(statErr)
    console.error(`[payload.config] DB file NOT accessible at ${dbFilePath}: ${msg}`)
    console.error(
      '[payload.config] Check that the volume is mounted and the path is correct.',
    )
  }
}

// Wrap sqliteAdapter so any synchronous initialisation error is captured and
// logged rather than swallowed.
let dbAdapter: ReturnType<typeof sqliteAdapter>
try {
  dbAdapter = sqliteAdapter({
    client: { url: databaseUrl },
  })
  console.log('[payload.config] sqliteAdapter initialised successfully')
} catch (adapterErr: unknown) {
  const msg = adapterErr instanceof Error ? adapterErr.message : String(adapterErr)
  const stack = adapterErr instanceof Error ? adapterErr.stack : undefined
  console.error('[payload.config] FATAL: sqliteAdapter threw during initialisation:', msg)
  if (stack) console.error(stack)
  // Re-throw so Next.js surfaces the error rather than starting with a broken config
  throw adapterErr
}

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: dbAdapter,
  collections: [Pages, Posts, Media, Categories, Users, Members],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
