import connect from "@/app/dbconfig/dbConfig"; // Correct import statement for the default export
import User from "@/models/userModels.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

// Ensure database connection is established
await connect();

export async function POST(request: NextRequest) {
    if (!TOKEN_SECRET) {
        throw new Error("❌ TOKEN_SECRET is missing in .env");
    }

    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
        return NextResponse.json(
            { message: "User does not exist" },
            { status: 400 }
        );
    }

    const validPassword = await bcryptjs.compare(password, user.password); // Ensure the field name matches your schema
    if (!validPassword) {
        return NextResponse.json(
            { message: "Invalid password" },
            { status: 400 }
        );
    }

    const tokenData = {
        id: user._id,
        email: user.email,
        username: user.username
    };

    const token =await jwt.sign(tokenData, TOKEN_SECRET, { expiresIn: '1h' }); // Use TOKEN_SECRET and add an expiration time

    const response =  NextResponse.json(
        {
            message: "Login successful",
        },
        { status: 200 }
    );

    response.cookies.set("token",token, {
        httpOnly: true
    })

    return response;
}
