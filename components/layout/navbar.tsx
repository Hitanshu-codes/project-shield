"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, LogOut, Settings, BarChart2, Upload, Bell, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"

export function Navbar() {
  const pathname = usePathname()
  const { user, logout, isAuthenticated } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Landing page detection
  const isLandingPage = pathname === "/"

  // Show simplified navbar on landing page
  const navLinks = isLandingPage
    ? [{ href: "/upload", label: "Get Started", highlight: true }]
    : [
        { href: "/upload", label: "Upload", icon: <Upload className="h-4 w-4 md:mr-2" /> },
        { href: "/dashboard", label: "Dashboard", icon: <BarChart2 className="h-4 w-4 md:mr-2" /> },
      ]

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-900/20 bg-black/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-teal-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-teal-400 via-cyan-300 to-purple-500 bg-clip-text text-transparent">
            Project Shield
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center text-gray-300 hover:text-teal-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center text-sm transition-colors
                ${
                  link.highlight
                    ? "bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 px-4 py-2 rounded-md text-white font-medium"
                    : "text-gray-300 hover:text-teal-400"
                }
              `}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              {!isLandingPage && (
                <Link href="/notifications" className="relative text-gray-300 hover:text-teal-400">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-teal-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                    3
                  </span>
                </Link>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-teal-400 to-purple-500 flex items-center justify-center cursor-pointer hover:shadow-glow transition-all">
                    <span className="text-xs font-bold text-black">{user?.name.slice(0, 2).toUpperCase() || "US"}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-purple-900/90 border border-purple-800 text-white">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-teal-400 to-purple-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-black">
                        {user?.name.slice(0, 2).toUpperCase() || "US"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{user?.name || "User Smith"}</p>
                      <p className="text-xs text-gray-400">{user?.email || "user@example.com"}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-purple-800" />
                  <DropdownMenuItem className="hover:bg-purple-800 cursor-pointer">
                    <Link href="/dashboard" className="flex items-center w-full">
                      <BarChart2 className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-purple-800 cursor-pointer">
                    <Link href="/settings" className="flex items-center w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-purple-800" />
                  <DropdownMenuItem
                    className="hover:bg-purple-800 cursor-pointer text-red-400 hover:text-red-300"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-teal-700 bg-transparent hover:bg-teal-900/30 text-teal-300"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile navigation dropdown */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-black/95 border-b border-purple-900/20 p-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center text-sm p-2 rounded transition-colors
                    ${
                      link.highlight
                        ? "bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white font-medium"
                        : "text-gray-300 hover:text-teal-400 hover:bg-purple-900/30"
                    }
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span className="ml-2">{link.label}</span>
                </Link>
              ))}

              {!isLandingPage && isAuthenticated && (
                <Link
                  href="/notifications"
                  className="flex items-center text-sm p-2 rounded text-gray-300 hover:text-teal-400 hover:bg-purple-900/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  <span>Notifications</span>
                  <span className="ml-2 h-5 w-5 bg-teal-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                    3
                  </span>
                </Link>
              )}

              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center text-sm p-2 rounded text-gray-300 hover:text-teal-400 hover:bg-purple-900/30"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BarChart2 className="h-4 w-4 mr-2" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center text-sm p-2 rounded text-gray-300 hover:text-teal-400 hover:bg-purple-900/30"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Settings</span>
                  </Link>
                  <button
                    className="flex items-center text-sm p-2 rounded text-red-400 hover:text-red-300 hover:bg-purple-900/30 w-full"
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Log out</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-purple-900/50">
                  <Link
                    href="/login"
                    className="flex items-center justify-center text-sm p-2 rounded-md text-teal-300 border border-teal-700 hover:bg-teal-900/30"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="flex items-center justify-center text-sm p-2 rounded-md text-white bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

