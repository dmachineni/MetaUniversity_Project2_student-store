import "./CheckoutForm.css"
import * as React from "react"
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { useState} from "react"


export default function CheckoutForm(props) {
    const [submitted, setSubmitted] = useState(false);
    return (
        <div className="checkout-form">
            <input className="checkout-form-input" type="email" name="email" 
                placeholder="student@codepath.org" value={props.checkoutForm.email}
                onChange={(e)=>{props.handleOnCheckoutFormChange("email", e.target.value)}}></input>
            <input className="checkout-form-input" type="text" name="name" 
                placeholder="Student Name" value={props.checkoutForm.name}
                onChange={(e)=>{props.handleOnCheckoutFormChange("name", e.target.value) }}></input>
            <button className="checkout-button" 
                onClick={()=>{
                    props.handleOnSubmitCheckoutForm()
                    setSubmitted(true)
                }} >
                    Checkout
            </button>
            {console.log(props.noError)}
            {submitted ? props.noError ? <div className="success">Success!</div>:<div className="error">Error Message: {props.error.message}</div>:console.log()}
        </div>
    )
}