"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Save, Bell, Shield, Lock, User, Globe } from "lucide-react"

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSave = () => {
    setIsSaving(true)
    setSuccessMessage("")

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      setSuccessMessage("Settings saved successfully")

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }, 1000)
  }

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
        <PageHeader title="Settings" description="Manage your account settings and preferences." />

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 bg-purple-900/30">
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-purple-800 data-[state=active]:text-teal-400"
            >
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-purple-800 data-[state=active]:text-teal-400"
            >
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-purple-800 data-[state=active]:text-teal-400"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="data-[state=active]:bg-purple-800 data-[state=active]:text-teal-400"
            >
              <Globe className="h-4 w-4 mr-2" />
              Preferences
            </TabsTrigger>
          </TabsList>

          {successMessage && (
            <div className="bg-green-900/20 border border-green-800 text-green-400 px-4 py-3 rounded-md mb-6">
              {successMessage}
            </div>
          )}

          <TabsContent value="account" className="space-y-6">
            <div className="bg-purple-900/20 rounded-lg border border-purple-800 p-6">
              <h3 className="text-lg font-medium mb-4 text-teal-400">Profile Information</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      defaultValue="User Smith"
                      className="w-full bg-black/50 border border-purple-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      defaultValue="user@example.com"
                      className="w-full bg-black/50 border border-purple-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-400">
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    defaultValue="Example Corp"
                    className="w-full bg-black/50 border border-purple-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-400">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    defaultValue="Content creator and intellectual property owner."
                    className="w-full bg-black/50 border border-purple-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 neon-button"
              >
                {isSaving ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Saving...
                  </span>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="bg-purple-900/20 rounded-lg border border-purple-800 p-6">
              <h3 className="text-lg font-medium mb-4 text-teal-400">Change Password</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-400">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      className="w-full bg-black/50 border border-purple-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-400">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      className="w-full bg-black/50 border border-purple-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-400">
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    className="w-full bg-black/50 border border-purple-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>
            </div>

            <div className="bg-purple-900/20 rounded-lg border border-purple-800 p-6">
              <h3 className="text-lg font-medium mb-4 text-teal-400">Two-Factor Authentication</h3>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Protect your account with two-factor authentication</p>
                  <p className="text-xs text-gray-500">
                    Currently: <span className="text-red-400">Disabled</span>
                  </p>
                </div>
                <Button variant="outline" className="border-teal-700 bg-teal-900/30 hover:bg-teal-800/50 text-teal-300">
                  <Shield className="h-4 w-4 mr-2" />
                  Enable 2FA
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 neon-button"
              >
                {isSaving ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Saving...
                  </span>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="bg-purple-900/20 rounded-lg border border-purple-800 p-6">
              <h3 className="text-lg font-medium mb-4 text-teal-400">Email Notifications</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Violation Detected</p>
                    <p className="text-sm text-gray-400">Get notified when new violations of your content are found</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-purple-900 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Takedown Status Updates</p>
                    <p className="text-sm text-gray-400">Get notified when the status of a takedown request changes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-purple-900 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-gray-400">Receive a weekly summary of your content protection status</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-purple-900 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Updates</p>
                    <p className="text-sm text-gray-400">Receive updates about new features and promotions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-purple-900 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 neon-button"
              >
                {isSaving ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Saving...
                  </span>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="bg-purple-900/20 rounded-lg border border-purple-800 p-6">
              <h3 className="text-lg font-medium mb-4 text-teal-400">Display Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-400">Toggle between light and dark mode</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-purple-900 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                <div className="space-y-2">
                  <label htmlFor="language" className="block text-sm font-medium text-gray-400">
                    Language
                  </label>
                  <select
                    id="language"
                    className="w-full bg-black/50 border border-purple-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-400">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    className="w-full bg-black/50 border border-purple-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  >
                    <option value="utc">UTC</option>
                    <option value="est">Eastern Time (ET)</option>
                    <option value="cst">Central Time (CT)</option>
                    <option value="mst">Mountain Time (MT)</option>
                    <option value="pst">Pacific Time (PT)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 neon-button"
              >
                {isSaving ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Saving...
                  </span>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

