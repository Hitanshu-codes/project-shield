"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, Loader2, FileText, Image, Video, Shield, Globe, Database, Server } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"

export default function SearchingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentAction, setCurrentAction] = useState("Initializing scan...")
  const [scannedSites, setScannedSites] = useState(0)
  const [matchesFound, setMatchesFound] = useState(0)
  const [mounted, setMounted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [scanSteps, setScanSteps] = useState([
    { name: "Content Analysis", completed: false, icon: <FileText className="h-4 w-4" /> },
    { name: "Social Media Scan", completed: false, icon: <Globe className="h-4 w-4" /> },
    { name: "File Sharing Sites", completed: false, icon: <Database className="h-4 w-4" /> },
    { name: "Content Marketplaces", completed: false, icon: <Server className="h-4 w-4" /> },
  ])

  useEffect(() => {
    setMounted(true)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Simulate scanning progress
  useEffect(() => {
    if (!mounted) return

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          setTimeout(() => {
            router.push("/violations")
          }, 1500)
          return 100
        }
        return prev + 1
      })

      setScannedSites((prev) => prev + Math.floor(Math.random() * 5) + 1)

      if (progress > 30 && progress < 90 && Math.random() > 0.85) {
        setMatchesFound((prev) => prev + 1)
      }
    }, 120)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [progress, router, mounted])

  // Update current action based on progress
  useEffect(() => {
    if (!mounted) return

    if (progress < 10) {
      setCurrentAction("Initializing scan...")
    } else if (progress < 30) {
      setCurrentAction("Analyzing content fingerprints...")
      setScanSteps((prev) => prev.map((step, i) => (i === 0 ? { ...step, completed: true } : step)))
    } else if (progress < 50) {
      setCurrentAction("Scanning social media platforms...")
      setScanSteps((prev) => prev.map((step, i) => (i <= 1 ? { ...step, completed: true } : step)))
    } else if (progress < 70) {
      setCurrentAction("Searching file sharing websites...")
      setScanSteps((prev) => prev.map((step, i) => (i <= 2 ? { ...step, completed: true } : step)))
    } else if (progress < 90) {
      setCurrentAction("Checking content marketplaces...")
      setScanSteps((prev) => prev.map((step, i) => ({ ...step, completed: true })))
    } else {
      setCurrentAction("Finalizing results...")
    }
  }, [progress, mounted])

  const files = [
    { name: "company-logo.png", type: "image", size: "1.2 MB" },
    { name: "product-video.mp4", type: "video", size: "24.5 MB" },
    { name: "whitepaper.pdf", type: "document", size: "3.8 MB" },
  ]

  // Return a loading state or null during server-side rendering
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0118]">
        <Navbar />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0118] text-white relative">
      <div className="cyber-grid"></div>
      <Navbar />
      <main className="container py-12 relative z-10">
        <PageHeader
          title="Scanning for Violations"
          description="Our AI is searching across the internet for unauthorized use of your content."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-purple-900/20 rounded-lg p-8 border border-purple-800 neon-border relative overflow-hidden">
              <div className="scan-line"></div>
              <div className="flex items-center justify-center mb-8">
                <div className="relative h-40 w-40">
                  <div className="absolute inset-0 rounded-full border-2 border-purple-800"></div>
                  <div
                    className="absolute inset-0 rounded-full border-2 border-teal-400"
                    style={{
                      clipPath: `polygon(0 0, 100% 0, 100% ${progress}%, 0 ${progress}%)`,
                      transition: "clip-path 0.5s ease-in-out",
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <Search className="h-10 w-10 text-teal-400 mb-2" />
                    <span className="text-2xl font-bold">{progress}%</span>
                  </div>

                  {/* Security rings animation - reduced intensity */}
                  <div className="security-rings">
                    <div className="ring ring1"></div>
                    <div className="ring ring2"></div>
                    <div className="ring ring3"></div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-medium mb-2 text-teal-400">{currentAction}</h3>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>This may take a few minutes</span>
                </div>
              </div>

              {/* Progress steps */}
              <div className="mb-8 bg-purple-900/30 rounded-lg p-4 border border-purple-800">
                <h4 className="text-sm font-medium mb-3 text-gray-300">Scan Progress</h4>
                <div className="space-y-3">
                  {scanSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center ${
                          step.completed ? "bg-teal-400/20 text-teal-400" : "bg-purple-800/50 text-gray-400"
                        }`}
                      >
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className={step.completed ? "text-white" : "text-gray-400"}>{step.name}</span>
                          {step.completed && <span className="text-xs text-teal-400">Completed</span>}
                        </div>
                        <div className="h-1 w-full bg-purple-800/50 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-teal-500 to-purple-500 rounded-full"
                            style={{
                              width: step.completed ? "100%" : "0%",
                              transition: "width 0.5s ease-in-out",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-800 hover-card">
                  <div className="text-3xl font-bold text-teal-400 mb-1">{scannedSites.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Sites Scanned</div>
                </div>
                <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-800 hover-card">
                  <div className="text-3xl font-bold text-purple-400 mb-1">{matchesFound}</div>
                  <div className="text-sm text-gray-400">Potential Matches</div>
                </div>
              </div>

              {progress === 100 && (
                <div className="text-center animate-fadeInUp">
                  <Button
                    onClick={() => router.push("/violations")}
                    className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 neon-button"
                  >
                    View Results <Shield className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800 mb-6 neon-border">
              <h3 className="text-lg font-medium mb-4 text-teal-400">Files Being Scanned</h3>
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-purple-900/30 rounded-lg hover-card">
                    {file.type === "image" && <Image className="h-5 w-5 text-teal-400" />}
                    {file.type === "video" && <Video className="h-5 w-5 text-purple-400" />}
                    {file.type === "document" && <FileText className="h-5 w-5 text-red-400" />}
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-gray-400">{file.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800 neon-border">
              <h3 className="text-lg font-medium mb-4 text-teal-400">Scan Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between hover:translate-x-2 transition-transform">
                  <span className="text-gray-400">Scan Type</span>
                  <span>Deep Scan</span>
                </div>
                <div className="flex justify-between hover:translate-x-2 transition-transform">
                  <span className="text-gray-400">Match Threshold</span>
                  <span>75%+</span>
                </div>
                <div className="flex justify-between hover:translate-x-2 transition-transform">
                  <span className="text-gray-400">Platforms</span>
                  <span>All</span>
                </div>
                <div className="flex justify-between hover:translate-x-2 transition-transform">
                  <span className="text-gray-400">Time Period</span>
                  <span>Last 12 Months</span>
                </div>
                <div className="flex justify-between hover:translate-x-2 transition-transform">
                  <span className="text-gray-400">AI Analysis</span>
                  <span className="text-teal-400">Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

