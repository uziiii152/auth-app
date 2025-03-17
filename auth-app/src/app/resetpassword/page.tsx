"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token"); // Get token from URL
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const resetPassword = async () => {
        if (password !== confirmPassword) {
            setError(true);
            setMessage("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/users/resetpassword", { password, token });
            setMessage(response.data.message);
            setError(false);
            router.push("/login"); // Redirect to login after reset
        } catch (error: any) {
            setError(true);
            setMessage(error.response?.data?.error || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Reset Password</h1>

            {/* Password Input */}
            <input
                type="password"
                placeholder="Enter new password"
                className="p-2 border border-gray-300 rounded mb-4 text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* Confirm Password Input */}
            <input
                type="password"
                placeholder="Confirm new password"
                className="p-2 border border-gray-300 rounded mb-4 text-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Submit Button */}
            <button
                onClick={resetPassword}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={!password || !confirmPassword || loading}
            >
                {loading ? "Submitting..." : "Reset Password"}
            </button>

            {/* Success Message */}
            {message && (
                <div className={`p-2 mt-4 ${error ? "bg-red-500" : "bg-green-500"} text-black`}>
                    <h2 className="text-2xl">{error ? "Error" : "Success"}</h2>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
}
