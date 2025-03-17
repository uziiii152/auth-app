"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const forgotPassword = async () => {
        try {
            setLoading(true);
            setError(false);
            setMessage('');

            const response = await axios.post('/api/users/forgotpassword', { email });
            setMessage(response.data.message);
        } catch (error: any) {
            setError(true);
            setMessage(error.response?.data?.error || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Forgot Password</h1>

            <input
                type="email"
                placeholder="Enter your email"
                className="p-2 border border-gray-300 rounded mb-4 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button
                onClick={forgotPassword}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={!email || loading}
            >
                {loading ? "Submitting..." : "Send Reset Link"}
            </button>

            {message && (
                <div className={`p-2 ${error ? "bg-red-500" : "bg-green-500"} text-black mt-4`}>
                    <h2 className="text-2xl">{error ? "Error" : "Success"}</h2>
                    <p>{message}</p>
                    {!error && (
                        <Link href="/login" className="underline">Go to Login</Link>
                    )}
                </div>
            )}
        </div>
    );
}
