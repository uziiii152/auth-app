// import { getDataFromToken } from "@/helper/getDataFromToken";

// import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/userModels";

// import connect from "@/app/dbconfig/dbConfig"

// connect();


// export async function GET(request:NextRequest){
//  try {
//     const userID = await getDataFromToken(request);
//     const user = User.findOne({_id:userID}).select("-password")
//     return NextResponse.json({message:"user found",data:user})
//  } catch (error:any) {
//     return NextResponse.json({error:error.message},{status:400})
    
//  }
// }


import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import connect from "@/app/dbconfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);
    const user = await User.findOne({ _id: userID }).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User found", data: user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
