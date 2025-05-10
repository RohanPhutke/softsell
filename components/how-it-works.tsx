"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, BarChart3, CreditCard, FileText, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export default function HowItWorks() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const [fileName, setFileName] = useState("")

  const steps = [
    {
      title: "Upload License",
      description: "Securely upload your software license details through our encrypted portal.",
      icon: Upload,
      delay: 0,
      action: () => setUploadModalOpen(true),
    },
    {
      title: "Get a Free Valuation",
      description: "Our AI-powered system analyzes market data to provide you with the best possible quote.",
      icon: BarChart3,
      delay: 0.2,
    },
    {
      title: "Receive Payment Instantly",
      description: "Once approved, receive payment directly to your preferred account within 24 hours.",
      icon: CreditCard,
      delay: 0.4,
    },
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    setFileName(file.name)
    setUploadState("uploading")

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setUploadState("success")
        }, 500)
      }
    }, 150)
  }

  const resetUpload = () => {
    setUploadState("idle")
    setUploadProgress(0)
    setFileName("")
  }

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Our streamlined process makes selling your unused software licenses quick and hassle-free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: step.delay }}
              className="bg-card rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>

              <div className="mb-6 relative">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <step.icon size={32} />
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 relative">
                <span className="text-emerald-600 dark:text-emerald-400 mr-2">{index + 1}.</span>
                {step.title}
              </h3>

              <p className="text-foreground/70 relative mb-5">{step.description}</p>

              {index === 0 && (
                <Button onClick={step.action} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                  Upload Now
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* License Upload Modal */}
      <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Your License</DialogTitle>
            <DialogDescription>Upload your software license file to get an instant valuation.</DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {uploadState === "idle" && (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  dragActive ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-border"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <FileText size={32} />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-medium">Drag and drop your license file</p>
                    <p className="text-sm text-foreground/70 mt-1">Supports PDF, XML, TXT, or license key files</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-foreground/50 mx-2">or</span>
                  </div>
                  <label htmlFor="license-file">
                    <Button
                      type="button"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => document.getElementById("license-file")?.click()}
                    >
                      Browse Files
                    </Button>
                    <input
                      id="license-file"
                      type="file"
                      className="hidden"
                      accept=".pdf,.xml,.txt,.lic,.key"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            )}

            {uploadState === "uploading" && (
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <FileText size={20} className="text-emerald-600 dark:text-emerald-400" />
                  <span className="font-medium truncate flex-1">{fileName}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
                <p className="text-sm text-foreground/70">
                  Please don't close this window while your license is being uploaded.
                </p>
              </div>
            )}

            {uploadState === "success" && (
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-center flex-col">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                    <Check size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Successful!</h3>
                  <p className="text-center text-foreground/70 mb-4">
                    Your license has been uploaded successfully. Our team will analyze it and provide you with a
                    valuation shortly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Button
                      onClick={() => {
                        resetUpload()
                        setUploadModalOpen(false)
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white"
                    >
                      Continue
                    </Button>
                    <Button variant="outline" onClick={resetUpload}>
                      Upload Another
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {uploadState === "error" && (
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-center flex-col">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mb-4">
                    <AlertCircle size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Failed</h3>
                  <p className="text-center text-foreground/70 mb-4">
                    There was an error uploading your license. Please try again or contact our support team.
                  </p>
                  <Button onClick={resetUpload} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
