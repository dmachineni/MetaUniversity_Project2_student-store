import "./CheckoutForm.css"
import * as React from "react"
import ShoppingCart from "../ShoppingCart/ShoppingCart";


export default function CheckoutForm(props) {
    let result;

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
                        .then((r)=>{
                            console.log("success");
                            <div className="success">Success!</div>
                            props.setShoppingCart([]);
                            let done = {name:"", email:""}
                            props.setCheckoutForm(done);
                        })
                        .catch((error)=>{
                            console.log("error");
                            <div className="error">
                                {error.message}
                            </div>
                        })
                }}>
                    Checkout
                {result}
            </button>
        </div>
    )
}