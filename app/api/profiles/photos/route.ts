import { createServerSupabase } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/types/supabase";



export async function GET(req: NextRequest){
    try {
        const supabase = createServerSupabase();
        const { searchParams } = new URL(req.url);

        const q = searchParams.get("q") || "";
        
        // Construir la consulta
        let query = supabase
            .from('photos')
            .select('image_url, thumbnail_url, uploaded_at, caption, spot_id')
            .eq('is_public', true)
            .order('uploaded_at', { ascending: false })
            .limit(12);

        // Agregar búsqueda si hay query
        if (q) {
            query = query.ilike('caption', `%${q}%`);
        }

        const { data: photos, error } = await query;

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(photos, { status: 200 });

    } catch (error) {
        console.error("Error fetching photos:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}