/**
 * GET /api/news/latest
 */
import { NextRequest, NextResponse } from 'next/server';
import { getLatestInsights } from '@/lib/news-pipeline';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 1800;

// Initialize Supabase outside the handler if possible, 
// or ensure env variables are present.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const slug = searchParams.get('slug');
    const type = searchParams.get('type') as 'strength' | 'weakness' | 'controversy' | null;
    const limitRaw = parseInt(searchParams.get('limit') ?? '50', 10);
    const limit = isNaN(limitRaw) ? 50 : limitRaw;

    let candidateId: string | undefined;

    // 1. Resolve Candidate Slug to ID
    if (slug) {
      const { data, error } = await supabase
        .from('candidates')
        .select('id')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
      }

      candidateId = data.id;
    }

    // 2. Fetch Insights
    let insights: any[] = [];
    try {
      insights = await getLatestInsights({
        candidateId,
        type: type ?? undefined,
        limit,
        hoursBack: 48,
      });
    } catch (e) {
      console.warn('News insights unavailable, returning empty array:', e);
      insights = [];
    }

    // 3. Return Response
    return NextResponse.json({ insights });

  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}