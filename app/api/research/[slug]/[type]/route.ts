import { NextResponse } from 'next/server'

/**
 * This route has been intentionally disabled.
 * The "Read More" feature now uses local in-page expansion (no AI calls).
 * All claim data is rendered directly from the database via the candidate profile page.
 */
export async function GET() {
  return NextResponse.json(
    { error: 'This endpoint is no longer active. Use the candidate profile page to view claim details.' },
    { status: 410 } // 410 Gone — intentionally removed
  )
}
