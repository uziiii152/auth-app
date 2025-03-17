import connect from "@/app/dbconfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { sendEmail } from "@/helper/mailer";  // Make sure this is imported correctly

connect();



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "Invalid email" }, { status: 401 });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Hash it using SHA-256 (not bcrypt)
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        // Store hashed token and expiry in DB
        user.forgotPasswordToken = hashedToken;
        user.forgotPasswordExpire = Date.now() + 3600000; // 1 hour

        await user.save();
        await sendEmail({
            email,
            emailType: 'RESET',
            userId: user._id.toString(),
            token: resetToken,  // Send raw token to email
        });


        // Send the raw token in the email
        return NextResponse.json({
            message: "Reset password link sent to your email",
            token: resetToken, // For testing purposes only. Remove this in production.
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


