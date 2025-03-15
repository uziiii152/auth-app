import connect from '@/app/dbconfig/dbConfig'
import { NextRequest,NextResponse } from 'next/server'
import User from '@/models/userModels'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);
        const user = await User.findOne({verifyToken:token})


        if(!user){
            return NextResponse.json({error:'Invalid or expired token'},{status:401})
        }

        console.log(user);

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        

        await user.save()

        return NextResponse.json({message:'Email verified successfully'},{status:200})
        


    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}