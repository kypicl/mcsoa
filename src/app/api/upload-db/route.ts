import { writeFile } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Temporary endpoint to upload a database file to replace the stale one.
 * This should be removed after the database is successfully uploaded.
 * 
 * Usage:
 * curl -X POST -F "file=@/path/to/mcsoa.db" http://localhost:3000/api/upload-db
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!file.name.endsWith('.db')) {
      return NextResponse.json(
        { error: 'File must be a .db file' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Write to the persistent volume
    const dbPath = join('/data/storage', 'mcsoa.db')
    await writeFile(dbPath, buffer)

    return NextResponse.json({
      success: true,
      message: `Database uploaded successfully (${buffer.length} bytes)`,
      path: dbPath,
      note: 'Please restart the service for changes to take effect',
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { error: `Upload failed: ${msg}` },
      { status: 500 }
    )
  }
}
