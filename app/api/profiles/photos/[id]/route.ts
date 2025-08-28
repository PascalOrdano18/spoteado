import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: {params: {id: string}}){
    try {
        
    } catch(error){
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    };
}