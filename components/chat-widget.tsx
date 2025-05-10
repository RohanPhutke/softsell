"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { InferenceClient } from "@huggingface/inference"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! How can I help you with selling your software licenses today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [isOpen, messages])


const client = new InferenceClient(process.env.NEXT_PUBLIC_HF_API_KEY!)

const handleSendMessage = async (e?: React.FormEvent) => {
  if (e) e.preventDefault()

  if (!inputValue.trim()) return

  const userMessage: Message = {
    id: Date.now().toString(),
    content: inputValue,
    role: "user",
    timestamp: new Date(),
  }

  setMessages((prev) => [...prev, userMessage])
  setInputValue("")
  setIsLoading(true)

  try {
    const chatCompletion = await client.chatCompletion({
      provider: "nebius",
      model: "deepseek-ai/DeepSeek-R1",
      messages: [
        {
          role: "system",
          content: `
        You are SoftBot, the friendly and helpful AI assistant for SoftSell — a modern software license reselling startup. Your job is to assist visitors with reselling their unused software licenses in a clear, friendly, and efficient manner.
        
        SoftSell helps businesses and individuals turn unused or surplus software licenses into cash. The process is simple:
        1. **Upload your license** — tell us what you want to sell.
        2. **Get a valuation** — we analyze it and give you a competitive offer.
        3. **Get paid** — once accepted, we handle the rest and send your payment quickly.
        
        Why customers love SoftSell:
        - Fast, free valuations.
        - Transparent pricing — no hidden fees.
        - Secure transactions with real-time updates.
        - Trusted by hundreds of small businesses and IT teams.
        
        As SoftBot, you should:
        - Keep your responses concise, friendly, and focused on license reselling.
        - Stay professional but warm — you're helpful, not robotic.
        
        Sample response style:
        User: “Hi”
        You: “Hi there! 👋 Welcome to SoftSell. Looking to sell your unused software licenses? I’m here to help!”
        
        If you're not sure how to answer, fall back to:
        "I'm not sure about that, but I can connect you with our support team if you'd like!"
        `,
        },        
        {
          role: "user",
          content: inputValue,
        },
      ],
    })

    const responseText = chatCompletion.choices[0]?.message?.content ?? "Hmm... I didn’t quite get that."
    const cleanedText = responseText.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();


    const assistantMessage: Message = {
      id: Date.now().toString(),
      content: cleanedText,
      role: "assistant",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
  } catch (err) {
    console.error(err)

    const fallbackMessage: Message = {
      id: Date.now().toString(),
      content:
        "I'm having trouble connecting right now. Please try again later or contact support directly.",
      role: "assistant",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, fallbackMessage])
  } finally {
    setIsLoading(false)
  }
}


  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    handleSendMessage()
  }

  const quickQuestions = [
    "How do I sell my license?",
    "What types of licenses do you buy?",
    "How much can I get for my licenses?",
    "Is the process secure?",
    "How long does the process take?",
  ]

  return (
    <>
      {/* Chat button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
          size="icon"
        >
          <MessageCircle size={24} />
        </Button>
      </motion.div>

      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-full sm:w-96 h-[500px] bg-background border border-border rounded-xl shadow-xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-muted flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-emerald-100 text-emerald-700">
                    <Bot size={16} />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">SoftSell Assistant</h3>
                  <p className="text-xs text-foreground/60">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                <X size={18} />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-emerald-600 text-white" : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    <div className="flex space-x-2">
                      <div
                        className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-border overflow-x-auto">
                <p className="text-xs text-foreground/60 mb-2">Suggested questions:</p>
                <div className="flex space-x-2 pb-1">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap text-xs"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
              <div className="flex">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 mr-2"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white"
                  disabled={!inputValue.trim() || isLoading}
                >
                  <Send size={18} />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
