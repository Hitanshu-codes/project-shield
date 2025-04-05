"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import {
  RefreshCw,
  Flag,
  Search,
  CheckCircle,
  Download,
  Filter,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Eye,
  FileText,
  AlertTriangle,
  ArrowRight,
  AlertCircle,
  BarChart2,
  List,
  Shield,
  Upload,
  Bell,
  Settings,
} from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

// Chart.js components
import { Chart, registerables } from "chart.js"
import { Line, Bar, Pie } from "react-chartjs-2"

// Register Chart.js components
if (typeof window !== "undefined") {
  Chart.register(...registerables)
}

export default function DashboardPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [timeRange, setTimeRange] = useState("last-week")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [viewMode, setViewMode] = useState("overview")
  const [sortColumn, setSortColumn] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")
  const [showStats, setShowStats] = useState(false)
  const [chartsReady, setChartsReady] = useState(false)
  const statsTimeout = useRef<NodeJS.Timeout | null>(null)

  // Handle mounting and initial data loading
  useEffect(() => {
    setMounted(true)

    // Simulate data loading with a slight delay to ensure hydration is complete
    const timer = setTimeout(() => {
      setShowStats(true)
      // Add a small delay before showing charts to ensure Chart.js is fully loaded
      setTimeout(() => {
        setChartsReady(true)
      }, 500)
    }, 1000)

    return () => {
      clearTimeout(timer)
      if (statsTimeout.current) {
        clearTimeout(statsTimeout.current)
      }
    }
  }, [])

  // Early return during server-side rendering or before client hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0118]">
        <Navbar />
        <main className="container py-12 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <PageHeader
              title="Real-Time Dashboard"
              description="Monitor your intellectual property protection status and analytics."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-purple-900/20 rounded-lg p-6 border border-purple-800">
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="h-10 w-10 rounded-full bg-purple-800/40" />
                    <Skeleton className="h-7 w-32 bg-purple-800/40" />
                  </div>
                  <Skeleton className="h-10 w-20 bg-purple-800/40 mb-2" />
                  <Skeleton className="h-5 w-36 bg-purple-800/40" />
                </div>
              ))}
          </div>
        </main>
      </div>
    )
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setShowStats(false)
    setChartsReady(false)

    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
      setShowStats(true)

      // Add a small delay before showing charts
      setTimeout(() => {
        setChartsReady(true)
      }, 500)
    }, 1500)
  }

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
    setShowStats(false)
    setChartsReady(false)

    // Simulate data loading for new time range
    statsTimeout.current = setTimeout(() => {
      setShowStats(true)

      // Add a small delay before showing charts
      setTimeout(() => {
        setChartsReady(true)
      }, 500)
    }, 800)
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  // Chart.js data and options
  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Violations",
        data: [12, 19, 15, 22, 28, 16, 8],
        borderColor: "#66ffff",
        backgroundColor: "rgba(102, 255, 255, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#66ffff",
      },
      {
        label: "Takedowns",
        data: [10, 15, 13, 18, 20, 14, 6],
        borderColor: "#ff66ff",
        backgroundColor: "rgba(255, 102, 255, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#ff66ff",
      },
    ],
  }

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#ffffff",
        },
      },
      tooltip: {
        backgroundColor: "#1a0a2e",
        borderColor: "#6b46c1",
        titleColor: "#66ffff",
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#666666",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#666666",
        },
      },
    },
  }

  const barChartData = {
    labels: ["Images", "Videos", "Documents", "Code"],
    datasets: [
      {
        label: "Total Violations",
        data: [42, 28, 18, 12],
        backgroundColor: "#66ffff",
        borderRadius: 4,
      },
      {
        label: "Successful Takedowns",
        data: [36, 22, 15, 8],
        backgroundColor: "#ff66ff",
        borderRadius: 4,
      },
    ],
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#ffffff",
        },
      },
      tooltip: {
        backgroundColor: "#1a0a2e",
        borderColor: "#6b46c1",
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#666666",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#666666",
        },
      },
    },
  }

  const pieChartData = {
    labels: ["Websites", "Social Media", "File Sharing", "Other"],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ["#66ffff", "#ff66ff", "#b9f2b9", "#666666"],
        borderWidth: 0,
      },
    ],
  }

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#ffffff",
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "#1a0a2e",
        borderColor: "#6b46c1",
      },
    },
  }

  // Sample data for activity table
  const activityData = [
    {
      id: 1,
      event: "Takedown Notice Sent",
      file: "product-video.mp4",
      platform: "YouTube",
      date: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      event: "Content Removed",
      file: "company-logo.png",
      platform: "Facebook",
      date: "5 hours ago",
      status: "success",
    },
    {
      id: 3,
      event: "New Match Found",
      file: "whitepaper.pdf",
      platform: "Academia.edu",
      date: "Yesterday",
      status: "action",
    },
    {
      id: 4,
      event: "Takedown Notice Sent",
      file: "product-manual.pdf",
      platform: "Scribd",
      date: "2 days ago",
      status: "success",
    },
    {
      id: 5,
      event: "Content Scan Completed",
      file: "All Files",
      platform: "Multiple",
      date: "3 days ago",
      status: "complete",
    },
    {
      id: 6,
      event: "DMCA Request Rejected",
      file: "tutorial.mp4",
      platform: "Vimeo",
      date: "4 days ago",
      status: "failed",
    },
  ]

  // Sort activity data
  const sortedActivity = [...activityData].sort((a, b) => {
    const dateOrder = {
      "2 hours ago": 6,
      "5 hours ago": 5,
      Yesterday: 4,
      "2 days ago": 3,
      "3 days ago": 2,
      "4 days ago": 1,
    }

    const statusOrder = {
      action: 5,
      pending: 4,
      success: 3,
      complete: 2,
      failed: 1,
    }

    const factor = sortDirection === "asc" ? 1 : -1

    if (sortColumn === "date") {
      return factor * (dateOrder[a.date as keyof typeof dateOrder] - dateOrder[b.date as keyof typeof dateOrder])
    } else if (sortColumn === "status") {
      return (
        factor * (statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder])
      )
    } else if (sortColumn === "platform") {
      return factor * a.platform.localeCompare(b.platform)
    } else if (sortColumn === "file") {
      return factor * a.file.localeCompare(b.file)
    } else {
      return factor * a.event.localeCompare(b.event)
    }
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <span className="text-green-400">Success</span>
      case "pending":
        return <span className="text-yellow-400">Pending</span>
      case "action":
        return <span className="text-red-400">Action Required</span>
      case "complete":
        return <span className="text-blue-400">Completed</span>
      case "failed":
        return <span className="text-red-500">Failed</span>
      default:
        return <span className="text-gray-400">{status}</span>
    }
  }

  // Determine if we should render charts
  const shouldRenderCharts = mounted && showStats && chartsReady

  return (
    <>
      {/* Load Chart.js script */}
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        strategy="afterInteractive"
        onLoad={() => setChartsReady(true)}
      />

      <div className="min-h-screen bg-[#0a0118] text-white relative">
        <div className="cyber-grid"></div>
        <Navbar />
        <main className="container py-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <PageHeader
              title="Real-Time Dashboard"
              description="Monitor your intellectual property protection status and analytics."
            />
            <div className="flex flex-wrap items-center gap-4">
              <Tabs
                value={viewMode}
                onValueChange={setViewMode}
                className="bg-purple-900/30 rounded-md border border-purple-800 p-1"
              >
                <TabsList className="bg-transparent">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-purple-800 data-[state=active]:text-teal-400 px-3 py-1.5"
                  >
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="list"
                    className="data-[state=active]:bg-purple-800 data-[state=active]:text-teal-400 px-3 py-1.5"
                  >
                    <List className="h-4 w-4 mr-2" />
                    List View
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                <SelectTrigger className="w-[180px] border-purple-700 bg-purple-900/30 text-gray-300">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-700">
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="all-time">All Time</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="border-teal-700 bg-teal-900/30 hover:bg-teal-800/50 text-teal-300"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh Data
              </Button>
            </div>
          </div>

          <Tabs value={viewMode} className="w-full">
            <TabsContent value="overview">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800 hover-card">
                  {showStats ? (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-teal-400/10 flex items-center justify-center">
                          <Flag className="h-5 w-5 text-teal-400" />
                        </div>
                        <h3 className="text-lg font-medium text-teal-400">Content Scanned</h3>
                      </div>
                      <div className="text-4xl font-bold">128</div>
                      <div className="mt-2 text-sm text-gray-400 flex items-center">
                        <span className="text-green-400 mr-1">↑ 12%</span> from previous period
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <Skeleton className="h-10 w-10 rounded-full bg-purple-800/40" />
                        <Skeleton className="h-7 w-32 bg-purple-800/40" />
                      </div>
                      <Skeleton className="h-10 w-20 bg-purple-800/40 mb-2" />
                      <Skeleton className="h-5 w-36 bg-purple-800/40" />
                    </>
                  )}
                </div>

                <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800 hover-card">
                  {showStats ? (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                          <Search className="h-5 w-5 text-purple-400" />
                        </div>
                        <h3 className="text-lg font-medium text-purple-400">Matches Found</h3>
                      </div>
                      <div className="text-4xl font-bold">42</div>
                      <div className="mt-2 text-sm text-gray-400 flex items-center">
                        <span className="text-red-400 mr-1">↑ 18%</span> from previous period
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <Skeleton className="h-10 w-10 rounded-full bg-purple-800/40" />
                        <Skeleton className="h-7 w-32 bg-purple-800/40" />
                      </div>
                      <Skeleton className="h-10 w-20 bg-purple-800/40 mb-2" />
                      <Skeleton className="h-5 w-36 bg-purple-800/40" />
                    </>
                  )}
                </div>

                <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800 hover-card">
                  {showStats ? (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-green-400/10 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        </div>
                        <h3 className="text-lg font-medium text-green-400">Takedowns</h3>
                      </div>
                      <div className="text-4xl font-bold">30</div>
                      <div className="mt-2 text-sm text-gray-400 flex items-center">
                        <span className="text-green-400 mr-1">↑ 8%</span> from previous period
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <Skeleton className="h-10 w-10 rounded-full bg-purple-800/40" />
                        <Skeleton className="h-7 w-32 bg-purple-800/40" />
                      </div>
                      <Skeleton className="h-10 w-20 bg-purple-800/40 mb-2" />
                      <Skeleton className="h-5 w-36 bg-purple-800/40" />
                    </>
                  )}
                </div>

                <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800 hover-card">
                  {showStats ? (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-yellow-400/10 flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-yellow-400" />
                        </div>
                        <h3 className="text-lg font-medium text-yellow-400">Pending Actions</h3>
                      </div>
                      <div className="text-4xl font-bold">12</div>
                      <div className="mt-2 text-sm text-gray-400 flex items-center">
                        <Button
                          variant="link"
                          className="text-yellow-400 p-0 h-auto font-normal text-sm"
                          onClick={() => router.push("/violations")}
                        >
                          View all <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <Skeleton className="h-10 w-10 rounded-full bg-purple-800/40" />
                        <Skeleton className="h-7 w-32 bg-purple-800/40" />
                      </div>
                      <Skeleton className="h-10 w-20 bg-purple-800/40 mb-2" />
                      <Skeleton className="h-5 w-36 bg-purple-800/40" />
                    </>
                  )}
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-teal-400">Activity Trends</h3>

                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 bg-teal-400 rounded-full"></div>
                        <span className="text-gray-300">Violations</span>
                      </div>
                      <div className="flex items-center gap-1 ml-3">
                        <div className="h-3 w-3 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-300">Takedowns</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-[300px] relative">
                    {shouldRenderCharts ? (
                      <Line data={lineChartData} options={lineChartOptions} />
                    ) : (
                      <div className="h-[300px] flex items-center justify-center">
                        <Skeleton className="h-[250px] w-full bg-purple-800/40 rounded-md" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800">
                  <h3 className="text-lg font-medium mb-4 text-teal-400">Content Type Distribution</h3>
                  <div className="h-[300px] relative">
                    {shouldRenderCharts ? (
                      <Bar data={barChartData} options={barChartOptions} />
                    ) : (
                      <div className="h-[300px] flex items-center justify-center">
                        <Skeleton className="h-[250px] w-full bg-purple-800/40 rounded-md" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Platform Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800">
                  <h3 className="text-lg font-medium mb-4 text-teal-400">Platform Distribution</h3>
                  <div className="h-[300px] relative">
                    {shouldRenderCharts ? (
                      <Pie data={pieChartData} options={pieChartOptions} />
                    ) : (
                      <div className="h-[300px] flex items-center justify-center">
                        <Skeleton className="h-[250px] w-full bg-purple-800/40 rounded-md" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2 bg-purple-900/20 rounded-lg p-6 border border-purple-800">
                  <h3 className="text-lg font-medium mb-4 text-teal-400">Recent Violations by Platform</h3>
                  {showStats ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-teal-400/10 flex items-center justify-center mr-2">
                              <span className="text-xs text-teal-400">FB</span>
                            </div>
                            <span className="text-sm">Facebook</span>
                          </div>
                          <span className="text-lg font-medium">18</span>
                        </div>
                        <div className="w-full h-2 bg-purple-900/50 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-400" style={{ width: "45%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-purple-400/10 flex items-center justify-center mr-2">
                              <span className="text-xs text-purple-400">YT</span>
                            </div>
                            <span className="text-sm">YouTube</span>
                          </div>
                          <span className="text-lg font-medium">12</span>
                        </div>
                        <div className="w-full h-2 bg-purple-900/50 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-400" style={{ width: "30%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-cyan-400/10 flex items-center justify-center mr-2">
                              <span className="text-xs text-cyan-400">TW</span>
                            </div>
                            <span className="text-sm">Twitter</span>
                          </div>
                          <span className="text-lg font-medium">8</span>
                        </div>
                        <div className="w-full h-2 bg-purple-900/50 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400" style={{ width: "20%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-red-400/10 flex items-center justify-center mr-2">
                              <span className="text-xs text-red-400">PI</span>
                            </div>
                            <span className="text-sm">Pinterest</span>
                          </div>
                          <span className="text-lg font-medium">4</span>
                        </div>
                        <div className="w-full h-2 bg-purple-900/50 rounded-full overflow-hidden">
                          <div className="h-full bg-red-400" style={{ width: "10%" }}></div>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <Button variant="link" className="text-teal-400 p-0 h-auto">
                          View full report <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Skeleton className="h-6 w-6 rounded-full bg-purple-800/40 mr-2" />
                              <Skeleton className="h-5 w-24 bg-purple-800/40" />
                            </div>
                            <Skeleton className="h-5 w-8 bg-purple-800/40" />
                          </div>
                          <Skeleton className="h-2 w-full bg-purple-800/40 rounded-full" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="list">
              {/* Recent Activity */}
              <div className="bg-purple-900/20 rounded-lg border border-purple-800 overflow-hidden mb-8">
                <div className="p-4 border-b border-purple-800 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-teal-400">Recent Activity</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
                    >
                      <Filter className="h-4 w-4 mr-1" /> Filter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
                    >
                      <Download className="h-4 w-4 mr-1" /> Export
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-purple-900/40 text-left">
                        <th
                          className="px-4 py-3 font-medium cursor-pointer hover:text-teal-400 transition-colors"
                          onClick={() => handleSort("event")}
                        >
                          <div className="flex items-center gap-1">
                            Event
                            {sortColumn === "event" &&
                              (sortDirection === "asc" ? (
                                <ArrowUp className="h-3 w-3" />
                              ) : (
                                <ArrowDown className="h-3 w-3" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 font-medium cursor-pointer hover:text-teal-400 transition-colors"
                          onClick={() => handleSort("file")}
                        >
                          <div className="flex items-center gap-1">
                            File
                            {sortColumn === "file" &&
                              (sortDirection === "asc" ? (
                                <ArrowUp className="h-3 w-3" />
                              ) : (
                                <ArrowDown className="h-3 w-3" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 font-medium cursor-pointer hover:text-teal-400 transition-colors"
                          onClick={() => handleSort("platform")}
                        >
                          <div className="flex items-center gap-1">
                            Platform
                            {sortColumn === "platform" &&
                              (sortDirection === "asc" ? (
                                <ArrowUp className="h-3 w-3" />
                              ) : (
                                <ArrowDown className="h-3 w-3" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 font-medium cursor-pointer hover:text-teal-400 transition-colors"
                          onClick={() => handleSort("date")}
                        >
                          <div className="flex items-center gap-1">
                            Date
                            {sortColumn === "date" &&
                              (sortDirection === "asc" ? (
                                <ArrowUp className="h-3 w-3" />
                              ) : (
                                <ArrowDown className="h-3 w-3" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 font-medium cursor-pointer hover:text-teal-400 transition-colors"
                          onClick={() => handleSort("status")}
                        >
                          <div className="flex items-center gap-1">
                            Status
                            {sortColumn === "status" &&
                              (sortDirection === "asc" ? (
                                <ArrowUp className="h-3 w-3" />
                              ) : (
                                <ArrowDown className="h-3 w-3" />
                              ))}
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {showStats
                        ? sortedActivity.map((activity) => (
                            <tr
                              key={activity.id}
                              className="border-t border-purple-800/50 hover:bg-purple-900/30 transition-all hover:translate-x-1"
                            >
                              <td className="px-4 py-3">{activity.event}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-teal-400" />
                                  <span>{activity.file}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3">{activity.platform}</td>
                              <td className="px-4 py-3 text-gray-400">{activity.date}</td>
                              <td className="px-4 py-3">{getStatusBadge(activity.status)}</td>
                              <td className="px-4 py-3">
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
                                  >
                                    <Eye className="h-4 w-4 mr-1" /> View
                                  </Button>
                                  {activity.status === "action" && (
                                    <Button
                                      size="sm"
                                      onClick={() => router.push(`/takedown/${activity.id}`)}
                                      className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 neon-button"
                                    >
                                      <Shield className="h-4 w-4 mr-1" /> Take Action
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        : // Skeleton loading for table
                          Array(6)
                            .fill(0)
                            .map((_, index) => (
                              <tr key={index} className="border-t border-purple-800/50">
                                <td className="px-4 py-3">
                                  <Skeleton className="h-5 w-32 bg-purple-800/40" />
                                </td>
                                <td className="px-4 py-3">
                                  <Skeleton className="h-5 w-28 bg-purple-800/40" />
                                </td>
                                <td className="px-4 py-3">
                                  <Skeleton className="h-5 w-24 bg-purple-800/40" />
                                </td>
                                <td className="px-4 py-3">
                                  <Skeleton className="h-5 w-20 bg-purple-800/40" />
                                </td>
                                <td className="px-4 py-3">
                                  <Skeleton className="h-5 w-16 bg-purple-800/40" />
                                </td>
                                <td className="px-4 py-3">
                                  <Skeleton className="h-8 w-24 bg-purple-800/40" />
                                </td>
                              </tr>
                            ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border-t border-purple-800 flex justify-between items-center">
                  <div className="text-sm text-gray-400">Showing {sortedActivity.length} of 24 activities</div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
                    >
                      <ChevronDown className="h-4 w-4 mr-1 rotate-90" /> Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push("/violations")}
                      className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
                    >
                      View All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
                    >
                      Next <ChevronDown className="h-4 w-4 ml-1 -rotate-90" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Critical Alerts */}
              <div className="bg-purple-900/20 rounded-lg border border-purple-800 overflow-hidden mb-8">
                <div className="p-4 border-b border-purple-800">
                  <h3 className="text-lg font-medium text-red-400 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Critical Alerts
                  </h3>
                </div>

                <div className="p-6">
                  {showStats ? (
                    <div className="space-y-4">
                      <div className="bg-red-900/10 border border-red-900/30 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-red-400 mb-1">High-Risk Content Detected</h4>
                            <p className="text-sm text-gray-300 mb-2">
                              Your product manual (product-manual.pdf) has been found on multiple file sharing sites
                              with a 92% match.
                            </p>
                            <div className="text-xs text-gray-400">Detected 2 days ago</div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => router.push("/takedown/4")}
                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                          >
                            Review & Act
                          </Button>
                        </div>
                      </div>

                      <div className="bg-yellow-900/10 border border-yellow-900/30 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-yellow-400 mb-1">Pending Takedown Requests</h4>
                            <p className="text-sm text-gray-300 mb-2">
                              You have 3 takedown requests that have been pending for more than 7 days.
                            </p>
                            <div className="text-xs text-gray-400">Updated 5 hours ago</div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => router.push("/violations")}
                            className="bg-yellow-900/50 hover:bg-yellow-900/70 text-yellow-300 border border-yellow-700"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Skeleton className="h-24 w-full bg-purple-800/40 rounded-lg" />
                      <Skeleton className="h-24 w-full bg-purple-800/40 rounded-lg" />
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <div className="mt-4 bg-purple-900/20 rounded-lg border border-purple-800 p-6">
            <h3 className="text-lg font-medium mb-6 text-teal-400">Quick Actions</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/upload")}
                className="h-auto py-4 border-teal-700 bg-teal-900/20 hover:bg-teal-900/40 text-teal-300 flex flex-col items-center gap-2"
              >
                <Upload className="h-5 w-5" />
                <span>Upload Content</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/violations")}
                className="h-auto py-4 border-purple-700 bg-purple-900/20 hover:bg-purple-900/40 text-purple-300 flex flex-col items-center gap-2"
              >
                <AlertTriangle className="h-5 w-5" />
                <span>View Violations</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/notifications")}
                className="h-auto py-4 border-cyan-700 bg-cyan-900/20 hover:bg-cyan-900/40 text-cyan-300 flex flex-col items-center gap-2"
              >
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/settings")}
                className="h-auto py-4 border-gray-700 bg-gray-900/20 hover:bg-gray-900/40 text-gray-300 flex flex-col items-center gap-2"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

