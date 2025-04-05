"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Upload, FileText, Image, Video, File, X, ArrowRight, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"

export default function UploadPage() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (file: File) => {
    const type = file.type.split("/")[0]
    switch (type) {
      case "image":
        return <Image className="h-6 w-6 text-teal-400" />
      case "video":
        return <Video className="h-6 w-6 text-purple-400" />
      case "text":
      case "application":
        if (file.name.endsWith(".pdf")) {
          return <FileText className="h-6 w-6 text-red-400" />
        }
        return <File className="h-6 w-6 text-blue-400" />
      default:
        return <File className="h-6 w-6 text-gray-400" />
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      router.push("/searching")
    }, 2000)
  }

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
          title="Upload Your Content"
          description="Upload your intellectual property to start scanning for unauthorized use across the internet."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors relative overflow-hidden ${
                  isDragging
                    ? "border-teal-400 bg-teal-400/5"
                    : "border-purple-700 hover:border-teal-400 hover:bg-purple-900/20"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-teal-400 animate-pulse" />
                <h3 className="text-xl font-medium mb-2">Drag and drop your files here</h3>
                <p className="text-gray-400 mb-4">or click to browse your files</p>
                <input type="file" multiple className="hidden" id="file-upload" onChange={handleFileChange} />
                <Button
                  type="button"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 neon-button"
                >
                  Select Files
                </Button>

                {isDragging && (
                  <div className="absolute inset-0 bg-teal-400/10 flex items-center justify-center">
                    <div className="text-teal-400 text-xl font-bold">Drop files here</div>
                  </div>
                )}
              </div>

              {files.length > 0 && (
                <div className="mt-8 animate-fadeInUp">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-teal-400" />
                    Selected Files ({files.length})
                  </h3>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-purple-900/30 rounded-lg p-3 border border-purple-800 hover-card"
                      >
                        <div className="flex items-center gap-3">
                          {getFileIcon(file)}
                          <div>
                            <p className="font-medium truncate max-w-[300px]">{file.name}</p>
                            <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button
                      type="submit"
                      disabled={isUploading}
                      className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 neon-button"
                    >
                      {isUploading ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4 text-white"
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
                          Uploading...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Start Scanning <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-800 neon-border">
            <h3 className="text-lg font-medium mb-4 text-teal-400">Supported File Types</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 hover:translate-x-2 transition-transform">
                <Image className="h-5 w-5 text-teal-400" />
                <div>
                  <p className="font-medium">Images</p>
                  <p className="text-xs text-gray-400">JPG, PNG, GIF, SVG, WebP</p>
                </div>
              </div>
              <div className="flex items-center gap-3 hover:translate-x-2 transition-transform">
                <Video className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="font-medium">Videos</p>
                  <p className="text-xs text-gray-400">MP4, MOV, AVI, WebM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 hover:translate-x-2 transition-transform">
                <FileText className="h-5 w-5 text-red-400" />
                <div>
                  <p className="font-medium">Documents</p>
                  <p className="text-xs text-gray-400">PDF, DOCX, TXT, HTML</p>
                </div>
              </div>
              <div className="flex items-center gap-3 hover:translate-x-2 transition-transform">
                <File className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="font-medium">Other</p>
                  <p className="text-xs text-gray-400">ZIP, RAR (will be extracted)</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-purple-800">
              <h4 className="font-medium mb-2 text-teal-400">Tips for Best Results</h4>
              <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5">
                <li>Upload original, high-quality files</li>
                <li>Include metadata when possible</li>
                <li>Group related files together</li>
                <li>Maximum file size: 500MB per file</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

