import * as React from "react"
import "./Sidebar.css"
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import ShoppingCart from "../ShoppingCart/ShoppingCart";


export default function Sidebar() {
  return (
    <section className="sidebar">
      <p>Sidebar</p>
      <button className="toggle-button" onClick={()=>handleOnToggle()}></button>
      
      <ShoppingCart />
      <CheckoutForm />
    </section>
  )
}
