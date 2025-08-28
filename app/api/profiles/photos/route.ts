import { createServerSupabase } from "@/lib/supabase-server";
import { Photo } from "@/types/supabase";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest){

    try {

        const supabase = createServerSupabase();

        const { searchParams } = new URL(req.url);

        const q = searchParams.get("q") || "";
        const photos = supabase
        .from('photos')
        .select( '*' )

        

        if (photos.error)
            return NextResponse.json( { error: "Error al obtener fotos" }, { status: 500 } )
        


    } catch (error){

    }

    return NextResponse.json(photos, { status: 200 })
}