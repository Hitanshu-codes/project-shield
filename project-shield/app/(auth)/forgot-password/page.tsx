"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!email) {
      setError("Please enter your email")
      return
    }

    setIsLoading(true)

    // Simulate password reset request
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#0a0118] flex items-center justify-center p-4 relative">
      <div className="cyber-grid"></div>

      {/* Forgot password card */}
      <div className="w-full max-w-md bg-purple-900/20 rounded-lg border border-purple-800 p-8 relative z-10">
        <div className="flex justify-center mb-2">
          <Shield className="h-12 w-12 text-teal-400" />
        </div>

        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-teal-400 via-cyan-300 to-purple-500 bg-clip-text text-transparent">
          RESET PASSWORD
        </h1>

        <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-purple-500 mx-auto mb-8"></div>

        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-2 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center">
            <div className="bg-green-900/20 border border-green-800 text-green-400 px-4 py-3 rounded-md mb-6">
              Password reset instructions have been sent to your email.
            </div>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 neon-button">
                Back to Login
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-400 mb-6 text-center">
              Enter your email address and we'll send you instructions to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-teal-400 text-lg">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-purple-800 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="Enter your email"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 neon-button py-3 text-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Instructions"
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Remember your password?{" "}
                <Link href="/login" className="text-teal-400 hover:text-teal-300 font-medium">
                  Back to Login
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

