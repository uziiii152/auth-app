import exp from "constants";
import { NextResponse } from "next/server";


export async function GET() {

try {
    // clear out the token
    const response = await NextResponse.json({message: "Logged out successfully"}, {status: 200})
    response.cookies.set("token", "", {httpOnly:true,expires: new Date(0)})

    return response
    
} catch (error:any) {
    return NextResponse.json({error: error.message}, {status: 500})
    
}

}
