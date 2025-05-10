# SoftSell - Software License Resale Platform

A responsive, single-page marketing website for a fictional software resale startup called **SoftSell**. This project demonstrates a modern, AI-integrated web application built using **Next.js 14**, **Tailwind CSS**, and **Framer Motion**, with a dynamic LLM-powered chatbot using Hugging Face Inference.

---

## 🚀 Features Implemented

### 🧩 Core Sections

- **Hero Section**  
  Bold headline, subheading, and clear CTA button (e.g., “Sell My Licenses”)

- **How It Works**  
  Three-step visual process: Upload License → Get Valuation → Get Paid

- **Why Choose Us**  
  Four feature cards showcasing speed, transparency, trust, and support

- **Customer Testimonials**  
  Two testimonial cards with dummy customer data

- **Contact / Lead Form**  
  Name, Email, Company, License Type (dropdown), and Message  
  Includes frontend validation for all fields

---

### 🎨 UI/UX Features

- Fully **responsive design** — mobile to desktop
- Clean, modern layout with consistent color palette
- **Emerald-based theme** for growth and financial trust
- Smooth animations via **Framer Motion**
- Interactive elements and hover effects
- Sticky header with scroll-based style change
- Light/Dark mode toggle (with persistent state)
- Smooth section scrolling via anchor navigation

---

### 🤖 Bonus: AI Chatbot Integration

- Embedded LLM-powered **customer chat widget**
- Uses Hugging Face Inference API with `deepseek-ai/DeepSeek-R1` model (via Nebius provider)
- Rich system prompt with SoftSell branding and tone baked in
- Regex-stripped output to eliminate meta tags (like `<think>`)
- Clean, friendly response tone tailored for SoftSell
- Handles fallback scenarios gracefully
- Easily extensible for future chatbot training or analytics

---

## 🎨 Design Choices

### 🎯 Color Palette

- **Primary:** Emerald green — growth, reliability, prosperity
- **Backgrounds:** White / Dark Slate — clean contrast
- **Accents:** Soft gradients, shadows, and animated transitions

### 🔤 Typography

- **Font:** Inter — modern, readable, well-balanced
- **Weight Variations:** Emphasis for headers and CTAs
- **Contrast-Rich:** Color-paired for readability and accessibility

### 📐 Layout

- Container-based responsive layout
- CSS Grid and Flexbox combos for dynamic alignment
- Generous whitespace for scannability

---

## 🧱 Components

- Built with **Shadcn/UI** for consistent component design
- Custom-designed cards, forms, and layout sections
- AI chat widget structured as a floating React component
- Typed message structure with loading state, error handling, and async support

---

## ⏱ Time Spent

| Task                     | Time      |
|--------------------------|-----------|
| Planning & wireframing   | 1 hours |
| Core layout + sections   | 1 hours   |
| Responsive styling       | 1 hour    |
| AI chat feature          | 1 hours   |
| Testing & refinement     | 0.5 hour  |
| **Total**                | ~4.5 hours  |

---

## 🛠 Technologies Used

- **Next.js 14** with App Router
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for motion effects
- **Shadcn/UI** component library
- **Hugging Face Inference SDK** for chatbot
- **TypeScript** throughout for type safety
- **Vercel** for deployment

---

## 🚀 Deployment

The site is deployed on **Vercel**  
🔗 [View Live Site](https://your-deployment-url.vercel.app)  

---

## 🧪 Local Development

```bash
git clone https://github.com/RohanPhutke/softsell.git
cd softsell
npm install
npm run dev
