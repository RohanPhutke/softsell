"use client"

import { motion } from "framer-motion"
import { Clock, Shield, DollarSign, HeadphonesIcon } from "lucide-react"

export default function WhyChooseUs() {
  const features = [
    {
      title: "Fast Quotes",
      description: "Get a price in minutes, not days. Our automated system works 24/7.",
      icon: Clock,
      delay: 0,
    },
    {
      title: "Secure Transfers",
      description: "All license transfers are verified and encrypted using enterprise-grade security.",
      icon: Shield,
      delay: 0.1,
    },
    {
      title: "Best Market Rates",
      description: "Our extensive network of buyers ensures you get the maximum value for your licenses.",
      icon: DollarSign,
      delay: 0.2,
    },
    {
      title: "Dedicated Support",
      description: "Talk to real humans who understand software licensing and can answer your questions.",
      icon: HeadphonesIcon,
      delay: 0.3,
    },
  ]

  return (
    <section id="why-choose-us" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            SoftSell offers unmatched benefits when it comes to selling your unused software licenses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                <feature.icon size={24} />
              </div>

              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>

              <p className="text-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
