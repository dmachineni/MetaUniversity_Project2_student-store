import * as React from "react"
import "./Sidebar.css"
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import ShoppingCart from "../ShoppingCart/ShoppingCart";


export default function Sidebar(props) {
  let class_var = (props.isOpen) ? "sidebar open" : "sidebar"
  return (
    <section className={class_var}>
      <button className="toggle-button" onClick={()=>props.handleOnToggle()}>
        {props.isOpen ? open():closed()}
      </button>
      {props.isOpen ? <ShoppingCart isOpen={props.isOpen} products = {props.products} 
        shoppingCart={props.shoppingCart}/> : console.log("")}
      
      {props.isOpen ? <CheckoutForm isOpen={props.isOpen} shoppingCart={props.shoppingCart} 
        checkoutForm={props.checkoutForm} handleOnCheckoutFormChange={props.handleOnCheckoutFormChange} 
        handleOnSubmitCheckoutForm={props.handleOnSubmitCheckoutForm}
        setShoppingCart={props.setShoppingCart} setCheckoutForm={props.setCheckoutForm}
        noError={props.noError} error={props.error}/> : console.log("")}
    </section>
  )
}

export function open(){
  return (
    <img className="open-arrow" src="https://w7.pngwing.com/pngs/674/479/png-transparent-arrow-computer-icons-simple-left-arrow-icon-miscellaneous-purple-angle.png" />
  )
}
export function closed(){
  return (
    <img className="closed-arrow" src="https://w7.pngwing.com/pngs/674/479/png-transparent-arrow-computer-icons-simple-left-arrow-icon-miscellaneous-purple-angle.png" />
  )
}
