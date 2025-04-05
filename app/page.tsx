"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Shield, ArrowRight, CheckCircle, Lock, Search } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0a0118] text-white relative">
      <div className="cyber-grid"></div>
      <Navbar />
      <main className="container py-16 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="relative mb-8">
            <Shield className="h-24 w-24 text-teal-400" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-purple-500/20"></div>
            </div>
            <div className="security-rings">
              <div className="ring ring1"></div>
              <div className="ring ring2"></div>
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-cyan-300 to-purple-500 bg-clip-text text-transparent">
            Protect Your Intellectual Property
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl">
            Project Shield uses advanced AI to scan the web for unauthorized use of your content and helps you take
            immediate action.
          </p>

          <div className="flex gap-4 mb-16">
            <Link href={isAuthenticated ? "/upload" : "/signup"}>
              <Button className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 neon-button px-8 py-6 text-lg">
                {isAuthenticated ? "Get Started" : "Sign Up Free"} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                variant="outline"
                className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300 px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </Link>
          </div>

          <div className="section-divider w-full"></div>

          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
            <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800 hover-card">
              <div className="h-12 w-12 rounded-full bg-teal-400/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-medium mb-2 text-teal-400">Advanced Scanning</h3>
              <p className="text-gray-400">
                Our AI-powered technology scans millions of websites to find unauthorized use of your intellectual
                property.
              </p>
            </div>

            <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800 hover-card">
              <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-medium mb-2 text-purple-400">Automated Protection</h3>
              <p className="text-gray-400">
                Generate DMCA takedown notices and legal documents with a single click to protect your content.
              </p>
            </div>

            <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800 hover-card">
              <div className="h-12 w-12 rounded-full bg-cyan-400/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-medium mb-2 text-cyan-400">Continuous Monitoring</h3>
              <p className="text-gray-400">
                Get real-time alerts when new violations are detected to stay ahead of potential IP theft.
              </p>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
              Trusted by Creators Worldwide
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-teal-400/20 flex items-center justify-center mr-3">
                    <span className="text-teal-400 font-bold">JS</span>
                  </div>
                  <div>
                    <p className="font-medium">John Smith</p>
                    <p className="text-xs text-gray-400">Photographer</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "Project Shield found 15 websites using my photos without permission. The automated takedown system
                  saved me countless hours of work."
                </p>
              </div>

              <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-purple-400/20 flex items-center justify-center mr-3">
                    <span className="text-purple-400 font-bold">AJ</span>
                  </div>
                  <div>
                    <p className="font-medium">Alex Johnson</p>
                    <p className="text-xs text-gray-400">Content Creator</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "I was shocked to discover how many people were stealing my content. With Project Shield, I've
                  successfully removed 90% of these violations."
                </p>
              </div>

              <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-cyan-400/20 flex items-center justify-center mr-3">
                    <span className="text-cyan-400 font-bold">EL</span>
                  </div>
                  <div>
                    <p className="font-medium">Emma Lee</p>
                    <p className="text-xs text-gray-400">Digital Artist</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "The real-time alerts are a game-changer. I now know immediately when someone uses my artwork, and the
                  legal tools make it easy to take action."
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 bg-gradient-to-r from-teal-900/30 to-purple-900/30 p-10 rounded-xl border border-purple-800 w-full">
            <h2 className="text-3xl font-bold mb-4">Ready to protect your content?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who trust Project Shield to defend their intellectual property
            </p>
            <Link href={isAuthenticated ? "/upload" : "/signup"}>
              <Button className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 neon-button px-8 py-6 text-lg">
                {isAuthenticated ? "Go to Dashboard" : "Start Free Trial"} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

