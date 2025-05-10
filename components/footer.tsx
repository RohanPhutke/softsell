import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-xl mr-2">
                S
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-emerald-200">
                SoftSell
              </span>
            </div>
            <p className="text-foreground/70 mb-4 max-w-md">
              SoftSell helps businesses recover value from unused software licenses through our secure and efficient
              marketplace.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-foreground/60 hover:text-emerald-500 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-foreground/60 hover:text-emerald-500 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-foreground/60 hover:text-emerald-500 transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-foreground/60 hover:text-emerald-500 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-foreground/70 hover:text-emerald-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-emerald-500 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-emerald-500 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-emerald-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-foreground/70 hover:text-emerald-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-emerald-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-emerald-500 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-emerald-500 transition-colors">
                  GDPR Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 text-center text-foreground/60">
          <p>© {new Date().getFullYear()} SoftSell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
