"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Eye,
  FileText,
  ArrowUpDown,
  ExternalLink,
  Shield,
  AlertTriangle,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"

export default function ViolationsPage() {
  const router = useRouter()
  const [sortColumn, setSortColumn] = useState("match")
  const [sortDirection, setSortDirection] = useState("desc")
  const [mounted, setMounted] = useState(false)
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

    const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  // Sample violation data
  const violations = [
    {
      id: 1,
      fileName: "example.pdf",
      match: 95,
      website: "piratebay.com",
      dateFound: "2024-01-20",
      type: "document",
      risk: "high",
    },
    {
      id: 2,
      fileName: "another-example.mp4",
      match: 88,
      website: "torrentz.eu",
      dateFound: "2024-01-25",
      type: "video",
      risk: "medium",
    },
    {
      id: 3,
      fileName: "copyrighted-image.png",
      match: 75,
      website: "example-forum.net",
      dateFound: "2024-01-28",
      type: "image",
      risk: "medium",
    },
    {
      id: 4,
      fileName: "product-manual.pdf",
      match: 92,
      website: "fileshare.org",
      dateFound: "2024-02-03",
      type: "document",
      risk: "high",
    },
    {
      id: 5,
      fileName: "company-logo.svg",
      match: 100,
      website: "fakebrand.com",
      dateFound: "2024-02-10",
      type: "image",
      risk: "critical",
    },
  ]

  // Filter violations based on selected risk level
  const filteredViolations = selectedRisk 
    ? violations.filter(v => v.risk === selectedRisk)
    : violations

  // Sort violations based on current sort settings
  const sortedViolations = [...filteredViolations].sort((a, b) => {
    const factor = sortDirection === "asc" ? 1 : -1

    switch (sortColumn) {
      case "fileName":
        return factor * a.fileName.localeCompare(b.fileName)
      case "match":
        return factor * (a.match - b.match)
      case "website":
        return factor * a.website.localeCompare(b.website)
      case "dateFound":
        return factor * (new Date(a.dateFound).getTime() - new Date(b.dateFound).getTime())
      case "risk":
        const riskOrder = { low: 1, medium: 2, high: 3, critical: 4 }
        return factor * (riskOrder[a.risk as keyof typeof riskOrder] - riskOrder[b.risk as keyof typeof riskOrder])
      default:
        return 0
    }
  })

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <span className="risk-badge risk-badge-low">Low</span>
      case "medium":
        return <span className="risk-badge risk-badge-medium">Medium</span>
      case "high":
        return <span className="risk-badge risk-badge-high">High</span>
      case "critical":
        return <span className="risk-badge risk-badge-critical">Critical</span>
      default:
        return null
    }
  }

  // Return a loading state or null during server-side rendering
  if (!mounted) {
    return <div className="min-h-screen bg-[#0a0118]"><Navbar /></div>
  }

  return (
    <div className="min-h-screen bg-[#0a0118] text-white relative">
      <div className="cyber-grid"></div>
      <Navbar />
      <main className="container py-12 relative z-10">
        <PageHeader
          title="Detected Violations"
          description="We've found potential intellectual property violations across the web. Review and take action on these matches."
        />

        <div className="bg-purple-900/20 rounded-lg border border-purple-800 overflow-hidden neon-border">
          <div className="p-4 flex justify-between items-center border-b border-purple-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <span className="font-medium">
                Found {filteredViolations.length} potential violations
              </span>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center mr-2">
                <span className="text-sm text-gray-400 mr-2">Filter by risk:</span>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRisk(null)}
                    className={`border-purple-700 ${!selectedRisk ? 'bg-purple-800/70 text-white' : 'bg-purple-900/30 text-gray-300'}`}
                  >
                    All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRisk("medium")}
                    className={`border-purple-700 ${selectedRisk === "medium" ? 'bg-purple-800/70 text-white' : 'bg-purple-900/30 text-gray-300'}`}
                  >
                    Medium
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRisk("high")}
                    className={`border-purple-700 ${selectedRisk === "high" ? 'bg-purple-800/70 text-white' : 'bg-purple-900/30 text-gray-300'}`}
                  >
                    High
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRisk("critical")}
                    className={`border-purple-700 ${selectedRisk === "critical" ? 'bg-purple-800/70 text-white' : 'bg-purple-900/30 text-gray-300'}`}
                  >
                    Critical
                  </Button>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
              >
                <Download className="h-4 w-4 mr-1" /> Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
              >
                <Filter className="h-4 w-4 mr-1" /> Advanced Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-900/40 text-left">
                  <th
                    className="px-4 py-3 font-medium cursor-pointer hover:text-teal-400 transition-colors"
                    onClick={() => handleSort("fileName")}
                  >
                    <div className="flex items-center gap-1">
                      File Name
                      {sortColumn === "fileName" && <ArrowUpDown className="h-4 w-4" />}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 font-medium cursor-pointer hover:text-teal-400 transition-colors"
                    onClick={() => handleSort("match")}
                  >
                    <div className="flex items-center gap-1">
                      Match %{sortColumn === "match" && <ArrowUpDown className="h-4 w-4" />}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 font-medium cursor-pointer hover:text-teal-400 transition-colors"
                    onClick={() => handleSort("website")}
                  >
                    <div className="flex items-center gap-1">
                      Website
                      {sortColumn === "website" && <ArrowUpDown className="h-4 w-4" />}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 font-medium cursor-pointer hover:text-teal-400 transition-colors"
                    onClick={() => handleSort("dateFound")}
                  >
                    <div className="flex items-center gap-1">
                      Date Found
                      {sortColumn === "dateFound" && <ArrowUpDown className="h-4 w-4" />}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 font-medium cursor-pointer hover:text-teal-400 transition-colors"
                    onClick={() => handleSort("risk")}
                  >
                    <div className="flex items-center gap-1">
                      Risk Level
                      {sortColumn === "risk" && <ArrowUpDown className="h-4 w-4" />}
                    </div>
                  </th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedViolations.map((violation) => (
                  <tr
                    key={violation.id}
                    className="border-t border-purple-800/50 hover:bg-purple-900/30 transition-all hover:translate-x-1"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-teal-400" />
                        <span>{violation.fileName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-medium ${
                          violation.match >= 90
                            ? "text-red-400"
                            : violation.match >= 80
                              ? "text-orange-400"
                              : "text-yellow-400"
                        }`}
                      >
                        {violation.match}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {violation.website}
                        <ExternalLink className="h-3 w-3 text-gray-500" />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{new Date(violation.dateFound).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{getRiskBadge(violation.risk)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => router.push(`/takedown/${violation.id}`)}
                          className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 neon-button"
                        >
                          <Shield className="h-4 w-4 mr-1" /> Take Action
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-purple-800 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Showing {sortedViolations.length} of {violations.length} results
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled
                className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

