import "./CheckoutForm.css"
import React from "react"
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
                onClick={()=>{ props.handleOnSubmitCheckoutForm(); setSubmitted(true);}} >
                    Checkout
            </button>
            {submitted ? props.noError ? success(props.receipt):<div className="error">Error Message: {props.error.message}</div>:console.log()}
        </div>
    )
}

function success(receipt) {
    console.log(receipt)
    return (
        <div className="return-success">
            <div className="success">Thank you for shopping with us! Here is your receipt: </div>
            <div className="receipt">
                {receipt}
            </div>
        </div>
    )
}