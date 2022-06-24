import * as React from "react"
import "./Navbar.css"
import Logo from "../Logo/Logo"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <h1 className="h1">Home</h1>
      <h1 className="h1">About Us</h1>
      <h1 className="h1">Contact Us</h1>
      <h1 className="h1">Buy Now</h1>
    </nav>
  )
}
