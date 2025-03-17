import connect from "@/app/dbconfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import crypto from "crypto";

connect();



export async function POST(request: NextRequest) {
    try {
        const { password, token } = await request.json();

        if (!password || !token) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        // Hash the incoming token using SHA-256
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // Find user with the hashed token
        const user = await User.findOne({
            forgotPasswordToken: hashedToken,
            forgotPasswordExpire: { $gt: Date.now() }, // Token should not be expired
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        // Remove reset token after use
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpire = undefined;

        await user.save();

        return NextResponse.json({ message: "Password reset successful" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
