/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import { GRAPHQL_POST, REST_OPTIONS } from '@payloadcms/next/routes'

const basePost = GRAPHQL_POST(config)

export async function POST(req: Request, ctx: unknown): Promise<Response> {
  try {
    return await basePost(req, ctx)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? err.stack : undefined
    console.error('[payload/api/graphql] Unhandled error:', message)
    if (stack) console.error(stack)
    return new Response(
      JSON.stringify({ errors: [{ message: 'Internal Server Error: ' + message }] }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}

export const OPTIONS = REST_OPTIONS(config)
