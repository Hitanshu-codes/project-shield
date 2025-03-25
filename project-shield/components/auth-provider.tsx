"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = () => {
      // Only run on client-side
      if (typeof window === "undefined") return

      try {
        // In a real app, you would check for a token in localStorage
        const userDataStr = localStorage.getItem("user")

        if (userDataStr) {
          const userData = JSON.parse(userDataStr)
          setUser(userData)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        // If there's an error, clear any potentially corrupted auth data
        localStorage.removeItem("user")
      } finally {
        setIsLoading(false)
      }
    }

    // Small delay to ensure hydration is complete
    const timer = setTimeout(() => {
      checkAuth()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would make an API call to your backend
      // For demo purposes, we'll simulate a successful login
      const userData = {
        id: "1",
        name: "User Smith",
        email: email,
      }

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData))

      setUser(userData)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would make an API call to create the account
      // For demo purposes, we'll simulate a successful signup
      const userData = {
        id: "1",
        name: "User Smith",
        email: email,
      }

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData))

      setUser(userData)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear auth data
    localStorage.removeItem("user")
    setUser(null)
    setIsAuthenticated(false)

    // Redirect to login page
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

