"use client"

import { useState, useEffect } from "react"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-xl mr-2">
              S
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-emerald-200">
              SoftSell
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("why-choose-us")}
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Why Choose Us
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Testimonials
          </button>
          <Button
            onClick={() => scrollToSection("contact")}
            variant="default"
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white"
          >
            Sell My Licenses
          </Button>
          <ModeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div className="fixed inset-0 top-16 bg-background z-40 p-4 flex flex-col">
          <div className="flex flex-col space-y-4 py-4">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-lg font-medium py-2 border-b border-border"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("why-choose-us")}
              className="text-lg font-medium py-2 border-b border-border"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-lg font-medium py-2 border-b border-border"
            >
              Testimonials
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="default"
              className="mt-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white"
              size="lg"
            >
              Sell My Licenses
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
