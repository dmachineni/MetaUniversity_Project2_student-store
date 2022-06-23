import * as React from "react"
import "./Navbar.css"
import Logo from "../Logo/Logo"

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>Student Store</h1>
      <Logo />
    </nav>
  )
}
