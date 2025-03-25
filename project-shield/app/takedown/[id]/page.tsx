"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Shield,
  FileText,
  ExternalLink,
  Copy,
  Check,
  Send,
  RefreshCw,
  Download,
  Clock,
  Calendar,
  ArrowLeft,
} from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TakedownPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [formattedDate, setFormattedDate] = useState("")

  useEffect(() => {
    setMounted(true)
    // Use a stable date format that won't change between server and client
    const today = new Date()
    setFormattedDate(
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
    )
  }, [])

  // Sample violation data (in a real app, you'd fetch this based on the ID)
  const violation = {
    id: params.id,
    fileName: "example.pdf",
    match: 95,
    website: "piratebay.com",
    dateFound: "2024-01-20",
    url: "https://piratebay.com/download/example.pdf",
    type: "document",
    risk: "high",
    owner: {
      name: "Your Company, Inc.",
      email: "legal@yourcompany.com",
      website: "https://yourcompany.com",
    },
    hostInfo: {
      name: "PirateBay Hosting",
      email: "dmca@piratebay.com",
      address: "123 Pirate Way, Torrent City, TC 12345",
    },
  }

  // Return a loading state during server-side rendering
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0118]">
        <Navbar />
      </div>
    )
  }

  // Sample AI-generated takedown notice - only generate this client-side
  const takedownNotice = `DMCA TAKEDOWN NOTICE

Date: ${formattedDate}

To Whom It May Concern at ${violation.website}:

This letter serves as notification under the Digital Millennium Copyright Act (DMCA) that my copyrighted material is being infringed upon on your website.

I, representing ${violation.owner.name}, am the copyright owner of the content that is being illegally copied and distributed on your website, specifically at:
${violation.url}

The unauthorized and infringing copy can be found at:
${violation.url}

This content is a direct copy of my original work titled "${violation.fileName}" and is protected by copyright law. I have a good faith belief that use of the material in the manner complained of is not authorized by me, the copyright owner.

I hereby request that you immediately remove or block access to this material as it appears on your service in accordance with 17 U.S.C. § 512(c).

I swear, under penalty of perjury, that the information in this notification is accurate and that I am the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.

Sincerely,

${violation.owner.name}
${violation.owner.email}
${violation.owner.website}`

  const handleCopy = () => {
    navigator.clipboard.writeText(takedownNotice)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRegenerate = () => {
    setGenerating(true)
    // Simulate regeneration delay
    setTimeout(() => {
      setGenerating(false)
    }, 2000)
  }

  const handleSend = () => {
    setSending(true)
    // Simulate sending delay
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-[#0a0118] text-white relative">
      <div className="cyber-grid"></div>
      <Navbar />
      <main className="container py-12 relative z-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/violations")}
              className="mb-4 border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Violations
            </Button>
            <PageHeader
              title="Takedown Action"
              description="Generate and send AI-powered takedown requests to protect your intellectual property."
            />
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">
                Detected: {new Date(violation.dateFound).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Time Elapsed: 14 days</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="notice" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6 bg-purple-900/30">
                <TabsTrigger
                  value="notice"
                  className="data-[state=active]:bg-purple-800 data-[state=active]:text-teal-400"
                >
                  Takedown Notice
                </TabsTrigger>
                <TabsTrigger
                  value="evidence"
                  className="data-[state=active]:bg-purple-800 data-[state=active]:text-teal-400"
                >
                  Evidence
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-purple-800 data-[state=active]:text-teal-400"
                >
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="notice" className="space-y-6">
                <div className="bg-purple-900/20 rounded-lg border border-purple-800 p-6 neon-border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-teal-400">AI-Generated DMCA Takedown Notice</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRegenerate}
                        disabled={generating}
                        className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
                      >
                        {generating ? (
                          <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4 mr-1" />
                        )}
                        Regenerate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-1 text-green-400" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-gray-300 whitespace-pre-wrap border border-purple-800/50 max-h-[400px] overflow-y-auto">
                    {takedownNotice}
                  </div>
                </div>

                <div className="bg-purple-900/20 rounded-lg border border-purple-800 p-6 neon-border">
                  <h3 className="text-lg font-medium mb-4 text-teal-400">Send Takedown Request</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Recipient</label>
                      <div className="flex items-center gap-2 bg-black/30 rounded-lg p-3 border border-purple-800/50">
                        <span>{violation.hostInfo.email}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">CC</label>
                      <div className="flex items-center gap-2 bg-black/30 rounded-lg p-3 border border-purple-800/50">
                        <span>{violation.owner.email}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Subject</label>
                      <div className="flex items-center gap-2 bg-black/30 rounded-lg p-3 border border-purple-800/50">
                        <span>DMCA Takedown Notice - Copyright Infringement on {violation.website}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      {sent ? (
                        <div className="bg-green-900/20 text-green-400 p-4 rounded-lg border border-green-800 flex items-center gap-2 animate-fadeInUp">
                          <Check className="h-5 w-5" />
                          <span>Takedown request sent successfully! We'll notify you of any updates.</span>
                        </div>
                      ) : (
                        <Button
                          onClick={handleSend}
                          disabled={sending}
                          className="w-full bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 neon-button"
                        >
                          {sending ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Send Takedown Request
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="evidence" className="space-y-6">
                <div className="bg-purple-900/20 rounded-lg border border-purple-800 p-6 neon-border">
                  <h3 className="text-lg font-medium mb-4 text-teal-400">Violation Evidence</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Original File</h4>
                      <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-purple-800/50 hover-card">
                        <FileText className="h-5 w-5 text-teal-400" />
                        <div>
                          <p className="font-medium">{violation.fileName}</p>
                          <p className="text-xs text-gray-400">Uploaded on Jan 15, 2024</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Infringing URL</h4>
                      <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-purple-800/50 hover-card">
                        <ExternalLink className="h-5 w-5 text-purple-400" />
                        <div>
                          <p className="font-medium flex items-center gap-1">
                            {violation.url}
                            <ExternalLink className="h-3 w-3 text-gray-500" />
                          </p>
                          <p className="text-xs text-gray-400">
                            Discovered on {new Date(violation.dateFound).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Match Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-black/30 rounded-lg border border-purple-800/50 hover-card">
                          <p className="text-xs text-gray-400 mb-1">Match Percentage</p>
                          <p className="text-xl font-bold text-teal-400">{violation.match}%</p>
                        </div>
                        <div className="p-3 bg-black/30 rounded-lg border border-purple-800/50 hover-card">
                          <p className="text-xs text-gray-400 mb-1">Risk Level</p>
                          <p className="text-xl font-bold text-red-400">High</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">AI Analysis</h4>
                      <div className="p-4 bg-black/30 rounded-lg border border-purple-800/50">
                        <p className="text-sm">
                          Our AI has determined this is a direct copy of your original content with minimal
                          modifications. The content is being distributed without proper attribution or licensing, which
                          constitutes a clear copyright violation under DMCA regulations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <div className="bg-purple-900/20 rounded-lg border border-purple-800 p-6 neon-border">
                  <h3 className="text-lg font-medium mb-4 text-teal-400">Action History</h3>

                  <div className="space-y-4">
                    <div className="relative pl-6 pb-6 border-l border-purple-800">
                      <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-teal-400"></div>
                      <div className="mb-1">
                        <span className="text-sm font-medium">Content detected</span>
                        <span className="text-xs text-gray-400 ml-2">
                          {new Date(violation.dateFound).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        Automated scan detected potential IP violation on {violation.website}
                      </p>
                    </div>

                    <div className="relative pl-6 pb-6 border-l border-purple-800">
                      <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-purple-400"></div>
                      <div className="mb-1">
                        <span className="text-sm font-medium">AI analysis completed</span>
                        <span className="text-xs text-gray-400 ml-2">
                          {new Date(violation.dateFound).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        AI determined 95% match with high confidence of copyright infringement
                      </p>
                    </div>

                    {sent && (
                      <div className="relative pl-6 pb-6 border-l border-purple-800 animate-fadeInUp">
                        <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-green-400"></div>
                        <div className="mb-1">
                          <span className="text-sm font-medium">Takedown notice sent</span>
                          <span className="text-xs text-gray-400 ml-2">{formattedDate}</span>
                        </div>
                        <p className="text-sm text-gray-400">DMCA takedown notice sent to {violation.hostInfo.email}</p>
                      </div>
                    )}

                    <div className="relative pl-6">
                      <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-gray-700"></div>
                      <div className="mb-1">
                        <span className="text-sm font-medium">Awaiting response</span>
                        <span className="text-xs text-gray-400 ml-2">Pending</span>
                      </div>
                      <p className="text-sm text-gray-400">Typical response time: 2-5 business days</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <div className="bg-purple-900/20 rounded-lg border border-purple-800 p-6 mb-6 neon-border">
              <h3 className="text-lg font-medium mb-4 text-teal-400">Violation Details</h3>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between hover:translate-x-2 transition-transform">
                  <span className="text-gray-400">File Name</span>
                  <span>{violation.fileName}</span>
                </div>
                <div className="flex justify-between hover:translate-x-2 transition-transform">
                  <span className="text-gray-400">Match Percentage</span>
                  <span className="text-teal-400 font-medium">{violation.match}%</span>
                </div>
                <div className="flex justify-between hover:translate-x-2 transition-transform">
                  <span className="text-gray-400">Website</span>
                  <span>{violation.website}</span>
                </div>
                <div className="flex justify-between hover:translate-x-2 transition-transform">
                  <span className="text-gray-400">Date Found</span>
                  <span>{new Date(violation.dateFound).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between hover:translate-x-2 transition-transform">
                  <span className="text-gray-400">Risk Level</span>
                  <span className="text-red-400 font-medium">High</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-900/20 rounded-lg border border-purple-800 p-6 mb-6 neon-border">
              <h3 className="text-lg font-medium mb-4 text-teal-400">Host Information</h3>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between hover:translate-x-2 transition-transform">
                  <span className="text-gray-400">Host Name</span>
                  <span>{violation.hostInfo.name}</span>
                </div>
                <div className="flex justify-between hover:translate-x-2 transition-transform">
                  <span className="text-gray-400">Contact Email</span>
                  <span className="text-teal-400">{violation.hostInfo.email}</span>
                </div>
                <div className="flex justify-between hover:translate-x-2 transition-transform">
                  <span className="text-gray-400">Address</span>
                  <span className="text-right">{violation.hostInfo.address}</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-900/20 rounded-lg border border-purple-800 p-6 neon-border">
              <h3 className="text-lg font-medium mb-4 text-teal-400">Additional Actions</h3>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300 hover:translate-y-[-2px] transition-transform"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Request Content Removal
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300 hover:translate-y-[-2px] transition-transform"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Legal Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300 hover:translate-y-[-2px] transition-transform"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Schedule Follow-up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

