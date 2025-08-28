
import { createServerSupabase } from "@/lib/supabase-server";
import { Database } from "@/types/supabase";
import { NextRequest, NextResponse } from "next/server";

type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export async function GET(req: NextRequest, { params } : { params: { id: string } }){
    const { id } = params;
    const supabase = await createServerSupabase();

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
    const supabase = await createServerSupabase();

    // Check authentication
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is editing their own profile
    if (session.user.id !== id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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