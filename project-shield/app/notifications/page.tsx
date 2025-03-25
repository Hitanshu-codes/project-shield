"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  ChevronDown,
  ChevronUp,
  Settings,
  FileText,
  Eye,
} from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function NotificationsPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState<any[]>([])
  const [filter, setFilter] = useState("all")
  const [expandedNotification, setExpandedNotification] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)

    // Simulate loading data
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          type: "alert",
          title: "New violation detected",
          message: "Your content 'product-manual.pdf' has been found on fileshare.org with a 92% match.",
          date: "2 hours ago",
          read: false,
          action: "/violations",
        },
        {
          id: 2,
          type: "success",
          title: "Takedown successful",
          message: "The takedown request for 'company-logo.png' on Facebook has been successfully processed.",
          date: "5 hours ago",
          read: false,
          action: null,
        },
        {
          id: 3,
          type: "info",
          title: "Scan completed",
          message: "Weekly scan of your content has been completed. 3 new matches found.",
          date: "Yesterday",
          read: true,
          action: "/dashboard",
        },
        {
          id: 4,
          type: "alert",
          title: "Action required",
          message:
            "A DMCA counter-notice has been filed for your takedown request of 'tutorial.mp4'. Please review and respond within 10 business days.",
          date: "2 days ago",
          read: true,
          action: "/takedown/6",
        },
        {
          id: 5,
          type: "success",
          title: "Content registered",
          message: "Your content has been successfully registered and is now being monitored for unauthorized use.",
          date: "3 days ago",
          read: true,
          action: null,
        },
        {
          id: 6,
          type: "info",
          title: "New feature available",
          message:
            "We've added new monitoring capabilities for social media platforms. Go to Settings to enable this feature.",
          date: "5 days ago",
          read: true,
          action: "/settings",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleMarkAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prevNotifications) => prevNotifications.map((notification) => ({ ...notification, read: true })))
  }

  const handleDismissNotification = (id: number) => {
    setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id))
  }

  const handleToggleExpand = (id: number) => {
    setExpandedNotification(expandedNotification === id ? null : id)
  }

  const handleAction = (action: string | null) => {
    if (action) {
      router.push(action)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "info":
        return <Info className="h-5 w-5 text-blue-400" />
      default:
        return <Bell className="h-5 w-5 text-gray-400" />
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.read
    return notification.type === filter
  })

  // Get counts for each category
  const unreadCount = notifications.filter((n) => !n.read).length
  const alertCount = notifications.filter((n) => n.type === "alert").length
  const successCount = notifications.filter((n) => n.type === "success").length
  const infoCount = notifications.filter((n) => n.type === "info").length

  // Return a loading state during server-side rendering
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
        <div className="flex justify-between items-center mb-8">
          <PageHeader
            title="Notifications"
            description="Stay updated on the status of your intellectual property protection."
          />
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={!unreadCount}
              className="border-teal-700 bg-teal-900/30 hover:bg-teal-800/50 text-teal-300"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/settings")}
              className="border-purple-700 bg-purple-900/30 hover:bg-purple-800/50 text-gray-300"
            >
              <Settings className="h-4 w-4 mr-2" />
              Notification Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={setFilter} className="w-full">
          <TabsList className="grid grid-cols-5 mb-8 bg-purple-900/30">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-800 data-[state=active]:text-teal-400">
              All
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-purple-700 text-xs">{notifications.length}</span>
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:bg-purple-800 data-[state=active]:text-teal-400">
              Unread
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-purple-700 text-xs">{unreadCount}</span>
            </TabsTrigger>
            <TabsTrigger
              value="alert"
              className="data-[state=active]:bg-purple-800 data-[state=active]:text-yellow-400"
            >
              Alerts
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-purple-700 text-xs">{alertCount}</span>
            </TabsTrigger>
            <TabsTrigger
              value="success"
              className="data-[state=active]:bg-purple-800 data-[state=active]:text-green-400"
            >
              Success
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-purple-700 text-xs">{successCount}</span>
            </TabsTrigger>
            <TabsTrigger value="info" className="data-[state=active]:bg-purple-800 data-[state=active]:text-blue-400">
              Info
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-purple-700 text-xs">{infoCount}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="bg-purple-900/20 rounded-lg border border-purple-800 overflow-hidden">
              {isLoading ? (
                <div className="p-6 space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-purple-800/50 rounded-lg p-4 bg-purple-900/30">
                      <div className="flex justify-between">
                        <div className="flex items-start gap-3">
                          <Skeleton className="h-8 w-8 rounded-full bg-purple-800/40" />
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-40 bg-purple-800/40" />
                            <Skeleton className="h-4 w-80 bg-purple-800/40" />
                            <Skeleton className="h-3 w-24 bg-purple-800/40" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-8 rounded-full bg-purple-800/40" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="p-12 text-center">
                  <Bell className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2 text-gray-300">No notifications</h3>
                  <p className="text-gray-500">
                    You don't have any {filter !== "all" ? filter + " " : ""}notifications at the moment.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-purple-800/50">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 ${notification.read ? "bg-purple-900/10" : "bg-purple-900/30"} transition-colors hover:bg-purple-900/40`}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                          <div>
                            <h3 className={`font-medium ${!notification.read ? "text-white" : "text-gray-300"}`}>
                              {notification.title}
                            </h3>
                            <p
                              className={`text-sm mt-1 ${expandedNotification === notification.id ? "" : "line-clamp-2"} ${!notification.read ? "text-gray-300" : "text-gray-400"}`}
                            >
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs text-gray-500">{notification.date}</span>
                              {notification.action && (
                                <Button
                                  variant="link"
                                  className="text-teal-400 p-0 h-auto text-xs"
                                  onClick={() => handleAction(notification.action)}
                                >
                                  View details
                                </Button>
                              )}
                              <Button
                                variant="link"
                                className="text-gray-400 p-0 h-auto text-xs"
                                onClick={() => handleToggleExpand(notification.id)}
                              >
                                {expandedNotification === notification.id ? (
                                  <span className="flex items-center">
                                    Show less <ChevronUp className="h-3 w-3 ml-1" />
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    Show more <ChevronDown className="h-3 w-3 ml-1" />
                                  </span>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-teal-400 hover:bg-teal-900/20"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                            onClick={() => handleDismissNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {notification.type === "alert" && expandedNotification === notification.id && (
                        <div className="mt-4 pt-4 border-t border-purple-800/30">
                          <div className="bg-yellow-900/10 border border-yellow-900/30 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <FileText className="h-5 w-5 text-yellow-400 mt-1" />
                              <div>
                                <h4 className="font-medium text-yellow-400">Detailed Information</h4>
                                <p className="text-sm text-gray-300 mt-1">
                                  This alert requires your attention. Please review the details and take appropriate
                                  action to protect your intellectual property.
                                </p>
                                <div className="flex gap-2 mt-4">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-yellow-700 bg-yellow-900/30 hover:bg-yellow-900/50 text-yellow-300"
                                    onClick={() => router.push(notification.action || "/violations")}
                                  >
                                    <Eye className="h-4 w-4 mr-2" /> View Details
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700"
                                    onClick={() => router.push(notification.action || "/violations")}
                                  >
                                    Take Action
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="unread">
            <div className="bg-purple-900/20 rounded-lg border border-purple-800 overflow-hidden">
              {isLoading ? (
                <div className="p-6 space-y-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="border border-purple-800/50 rounded-lg p-4 bg-purple-900/30">
                      <div className="flex justify-between">
                        <div className="flex items-start gap-3">
                          <Skeleton className="h-8 w-8 rounded-full bg-purple-800/40" />
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-40 bg-purple-800/40" />
                            <Skeleton className="h-4 w-80 bg-purple-800/40" />
                            <Skeleton className="h-3 w-24 bg-purple-800/40" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-8 rounded-full bg-purple-800/40" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="p-12 text-center">
                  <Bell className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2 text-gray-300">No unread notifications</h3>
                  <p className="text-gray-500">You don't have any unread notifications at the moment.</p>
                </div>
              ) : (
                <div className="divide-y divide-purple-800/50">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 bg-purple-900/30 transition-colors hover:bg-purple-900/40"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                          <div>
                            <h3 className="font-medium text-white">{notification.title}</h3>
                            <p
                              className={`text-sm mt-1 ${expandedNotification === notification.id ? "" : "line-clamp-2"} text-gray-300`}
                            >
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs text-gray-500">{notification.date}</span>
                              {notification.action && (
                                <Button
                                  variant="link"
                                  className="text-teal-400 p-0 h-auto text-xs"
                                  onClick={() => handleAction(notification.action)}
                                >
                                  View details
                                </Button>
                              )}
                              <Button
                                variant="link"
                                className="text-gray-400 p-0 h-auto text-xs"
                                onClick={() => handleToggleExpand(notification.id)}
                              >
                                {expandedNotification === notification.id ? (
                                  <span className="flex items-center">
                                    Show less <ChevronUp className="h-3 w-3 ml-1" />
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    Show more <ChevronDown className="h-3 w-3 ml-1" />
                                  </span>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-teal-400 hover:bg-teal-900/20"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                            onClick={() => handleDismissNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {notification.type === "alert" && expandedNotification === notification.id && (
                        <div className="mt-4 pt-4 border-t border-purple-800/30">
                          <div className="bg-yellow-900/10 border border-yellow-900/30 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <FileText className="h-5 w-5 text-yellow-400 mt-1" />
                              <div>
                                <h4 className="font-medium text-yellow-400">Detailed Information</h4>
                                <p className="text-sm text-gray-300 mt-1">
                                  This alert requires your attention. Please review the details and take appropriate
                                  action to protect your intellectual property.
                                </p>
                                <div className="flex gap-2 mt-4">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-yellow-700 bg-yellow-900/30 hover:bg-yellow-900/50 text-yellow-300"
                                    onClick={() => router.push(notification.action || "/violations")}
                                  >
                                    <Eye className="h-4 w-4 mr-2" /> View Details
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700"
                                    onClick={() => router.push(notification.action || "/violations")}
                                  >
                                    Take Action
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="alert">
            <div className="bg-purple-900/20 rounded-lg border border-purple-800 overflow-hidden">
              {isLoading ? (
                <div className="p-6 space-y-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="border border-purple-800/50 rounded-lg p-4 bg-purple-900/30">
                      <div className="flex justify-between">
                        <div className="flex items-start gap-3">
                          <Skeleton className="h-8 w-8 rounded-full bg-purple-800/40" />
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-40 bg-purple-800/40" />
                            <Skeleton className="h-4 w-80 bg-purple-800/40" />
                            <Skeleton className="h-3 w-24 bg-purple-800/40" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-8 rounded-full bg-purple-800/40" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="p-12 text-center">
                  <AlertTriangle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2 text-gray-300">No alerts</h3>
                  <p className="text-gray-500">You don't have any alert notifications at the moment.</p>
                </div>
              ) : (
                <div className="divide-y divide-purple-800/50">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 ${notification.read ? "bg-purple-900/10" : "bg-purple-900/30"} transition-colors hover:bg-purple-900/40`}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <AlertTriangle className="h-5 w-5 text-yellow-400" />
                          </div>
                          <div>
                            <h3 className={`font-medium ${!notification.read ? "text-white" : "text-gray-300"}`}>
                              {notification.title}
                            </h3>
                            <p
                              className={`text-sm mt-1 ${expandedNotification === notification.id ? "" : "line-clamp-2"} ${!notification.read ? "text-gray-300" : "text-gray-400"}`}
                            >
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs text-gray-500">{notification.date}</span>
                              {notification.action && (
                                <Button
                                  variant="link"
                                  className="text-teal-400 p-0 h-auto text-xs"
                                  onClick={() => handleAction(notification.action)}
                                >
                                  View details
                                </Button>
                              )}
                              <Button
                                variant="link"
                                className="text-gray-400 p-0 h-auto text-xs"
                                onClick={() => handleToggleExpand(notification.id)}
                              >
                                {expandedNotification === notification.id ? (
                                  <span className="flex items-center">
                                    Show less <ChevronUp className="h-3 w-3 ml-1" />
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    Show more <ChevronDown className="h-3 w-3 ml-1" />
                                  </span>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-teal-400 hover:bg-teal-900/20"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                            onClick={() => handleDismissNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {expandedNotification === notification.id && (
                        <div className="mt-4 pt-4 border-t border-purple-800/30">
                          <div className="bg-yellow-900/10 border border-yellow-900/30 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <FileText className="h-5 w-5 text-yellow-400 mt-1" />
                              <div>
                                <h4 className="font-medium text-yellow-400">Detailed Information</h4>
                                <p className="text-sm text-gray-300 mt-1">
                                  This alert requires your attention. Please review the details and take appropriate
                                  action to protect your intellectual property.
                                </p>
                                <div className="flex gap-2 mt-4">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-yellow-700 bg-yellow-900/30 hover:bg-yellow-900/50 text-yellow-300"
                                    onClick={() => router.push(notification.action || "/violations")}
                                  >
                                    <Eye className="h-4 w-4 mr-2" /> View Details
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700"
                                    onClick={() => router.push(notification.action || "/violations")}
                                  >
                                    Take Action
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="success">
            <div className="bg-purple-900/20 rounded-lg border border-purple-800 overflow-hidden">
              {isLoading ? (
                <div className="p-6 space-y-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="border border-purple-800/50 rounded-lg p-4 bg-purple-900/30">
                      <div className="flex justify-between">
                        <div className="flex items-start gap-3">
                          <Skeleton className="h-8 w-8 rounded-full bg-purple-800/40" />
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-40 bg-purple-800/40" />
                            <Skeleton className="h-4 w-80 bg-purple-800/40" />
                            <Skeleton className="h-3 w-24 bg-purple-800/40" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-8 rounded-full bg-purple-800/40" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2 text-gray-300">No success notifications</h3>
                  <p className="text-gray-500">You don't have any success notifications at the moment.</p>
                </div>
              ) : (
                <div className="divide-y divide-purple-800/50">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 ${notification.read ? "bg-purple-900/10" : "bg-purple-900/30"} transition-colors hover:bg-purple-900/40`}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          </div>
                          <div>
                            <h3 className={`font-medium ${!notification.read ? "text-white" : "text-gray-300"}`}>
                              {notification.title}
                            </h3>
                            <p
                              className={`text-sm mt-1 ${expandedNotification === notification.id ? "" : "line-clamp-2"} ${!notification.read ? "text-gray-300" : "text-gray-400"}`}
                            >
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs text-gray-500">{notification.date}</span>
                              <Button
                                variant="link"
                                className="text-gray-400 p-0 h-auto text-xs"
                                onClick={() => handleToggleExpand(notification.id)}
                              >
                                {expandedNotification === notification.id ? (
                                  <span className="flex items-center">
                                    Show less <ChevronUp className="h-3 w-3 ml-1" />
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    Show more <ChevronDown className="h-3 w-3 ml-1" />
                                  </span>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-teal-400 hover:bg-teal-900/20"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                            onClick={() => handleDismissNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="info">
            <div className="bg-purple-900/20 rounded-lg border border-purple-800 overflow-hidden">
              {isLoading ? (
                <div className="p-6 space-y-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="border border-purple-800/50 rounded-lg p-4 bg-purple-900/30">
                      <div className="flex justify-between">
                        <div className="flex items-start gap-3">
                          <Skeleton className="h-8 w-8 rounded-full bg-purple-800/40" />
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-40 bg-purple-800/40" />
                            <Skeleton className="h-4 w-80 bg-purple-800/40" />
                            <Skeleton className="h-3 w-24 bg-purple-800/40" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-8 rounded-full bg-purple-800/40" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="p-12 text-center">
                  <Info className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2 text-gray-300">No info notifications</h3>
                  <p className="text-gray-500">You don't have any info notifications at the moment.</p>
                </div>
              ) : (
                <div className="divide-y divide-purple-800/50">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 ${notification.read ? "bg-purple-900/10" : "bg-purple-900/30"} transition-colors hover:bg-purple-900/40`}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <Info className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <h3 className={`font-medium ${!notification.read ? "text-white" : "text-gray-300"}`}>
                              {notification.title}
                            </h3>
                            <p
                              className={`text-sm mt-1 ${expandedNotification === notification.id ? "" : "line-clamp-2"} ${!notification.read ? "text-gray-300" : "text-gray-400"}`}
                            >
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs text-gray-500">{notification.date}</span>
                              {notification.action && (
                                <Button
                                  variant="link"
                                  className="text-teal-400 p-0 h-auto text-xs"
                                  onClick={() => handleAction(notification.action)}
                                >
                                  View details
                                </Button>
                              )}
                              <Button
                                variant="link"
                                className="text-gray-400 p-0 h-auto text-xs"
                                onClick={() => handleToggleExpand(notification.id)}
                              >
                                {expandedNotification === notification.id ? (
                                  <span className="flex items-center">
                                    Show less <ChevronUp className="h-3 w-3 ml-1" />
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    Show more <ChevronDown className="h-3 w-3 ml-1" />
                                  </span>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-teal-400 hover:bg-teal-900/20"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                            onClick={() => handleDismissNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

