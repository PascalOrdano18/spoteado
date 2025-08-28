
import { supabase } from "@/lib/supabase";
import { createServerSupabase } from "@/lib/supabase-server";

import { Database } from "@/types/supabase";
import { NextRequest, NextResponse } from "next/server";

type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

// const supabase = createServerSupabase();


export async function GET(req: NextRequest, { params } : { params: { id: string } }){
    const { id } = params;

    try {
        const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', params.id)
        .single();

        if(error)
            return NextResponse.json( { error: "Profile not found" }, { status: 404 } );
        
        return NextResponse.json(data);
    } catch (error){
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    };
}


// para editar el perfil
export async function PUT(req: NextRequest, { params }: { params: { id: string } }){
    const { id } = params;
    const body: ProfileUpdate = await req.json();

    try{   
        const { data, error } = await supabase 
        .from('profiles')
        .update(body)
        .eq('id', id)
        .select()
        .single();

        if(error){
            return NextResponse.json( { error: error.message }, { status: 400 } );
        }
        return NextResponse.json(data);
    } catch(error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    };
}