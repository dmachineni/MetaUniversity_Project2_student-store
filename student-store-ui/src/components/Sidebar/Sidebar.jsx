import * as React from "react"
import "./Sidebar.css"

export default function Sidebar() {
  return (
    <section className="sidebar">
      <p>Sidebar</p>
      <button className="toggle-button" onClick={()=>handleOnToggle()}></button>
    </section>
  )
}
