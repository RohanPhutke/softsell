"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "SoftSell made the process super simple and fast. We had several unused enterprise licenses that were just sitting there costing us money. Within a week, we converted them to cash that we could reinvest.",
      name: "Sarah L.",
      role: "IT Manager",
      company: "Acme Corp",
      initials: "SL",
      delay: 0,
    },
    {
      quote:
        "I was surprised how much value I got from my unused licenses. The valuation was higher than expected, and the payment was processed immediately after the transfer was complete.",
      name: "John D.",
      role: "Procurement Lead",
      company: "ByteWorks",
      initials: "JD",
      delay: 0.2,
    },
  ]

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their experience with SoftSell.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: testimonial.delay }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <Quote className="text-emerald-500 mb-4 h-8 w-8" />
                  <p className="text-lg mb-6 italic text-foreground/80">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4 border-2 border-emerald-200 dark:border-emerald-800">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-foreground/70">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
