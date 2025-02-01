"use client"
import connect from "@/app/dbconfig/dbConfig"; // Correct import statement for the default export
import User from "@/models/userModels.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose"; // Import for debugging

export async function POST(request: NextRequest) {
    try {
        console.log("🔍 Incoming Signup Request...");

        // Ensure database connection is established inside the function
        await connect();
        console.log("✅ Database Connection Established");

        // Debug: Check if MongoDB is actually connected
        if (!mongoose.connection.readyState) {
            throw new Error("❌ MongoDB is still not connected.");
        }

        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log("✅ Request Body:", reqBody);

        // Check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            console.log("⚠️ User already exists:", user);
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        console.log("🔑 Hashed Password Created");

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log("✅ New User Created:", savedUser);

        return NextResponse.json(
            { message: "User created successfully", success: true, savedUser },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("❌ Signup Error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
