// restaurant-elegant/TemplateApp.tsx

'use client'

import { useState } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Menu from "./pages/Menu"
import Contact from "./pages/Contact"

export default function RestaurantElegant({ content }: any) {
  const [route, setRoute] = useState("/")

  let Page

  switch (route) {
    case "/menu":
      Page = Menu
      break
    case "/about":
      Page = About
      break
    case "/contact":
      Page = Contact
      break
    default:
      Page = Home
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar navigate={setRoute} />
      <Page content={content} />
      <Footer />
    </div>
  )
}