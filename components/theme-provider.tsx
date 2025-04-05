"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeProviderState = {
  theme: string
  setTheme: (theme: string) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for stored theme preference or use default
    const storedTheme = localStorage.getItem("theme") || "dark"
    setTheme(storedTheme)
    // Apply the theme class on initial client-side render
    document.documentElement.classList.add(storedTheme)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Save theme preference
    localStorage.setItem("theme", theme)

    // Update theme class
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme, mounted])

  const value = {
    theme,
    setTheme,
  }

  // Only render children after mounting to avoid hydration mismatch
  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

