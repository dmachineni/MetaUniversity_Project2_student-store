import "./ShoppingCart.css"
import * as React from "react"


export default function ShoppingCart(props) {
    let len = props.shoppingCart.length
    return (
        (len === 0) ? emptyCard() : filledCart(props.products, props.shoppingCart)
    )
}

function emptyCard() {
    return (
        <div className="notification">
            No items added to cart yet. Start shopping now!
        </div>
    )
}

export function filledCart(products, shoppingCart) {
    let subtotal = 0;
    return (
        <div className="shopping-cart">
            {shoppingCart.map((item,idx) => {
                let name =""
                let product = products.find((p)=>p.id == item.itemId)
                name = product.name;
                subtotal = subtotal + (product.price*item.quantity)

                return (
                    <section key={idx} className="cart-product">
                        <div className="cart-product-name">
                            {name}
                        </div>

                        <div className="cart-product-quantity">
                            {item.quantity}
                        </div>
                    </section>
                )  
            })}
            
            <div className="subtotal">
                subtotal: ${subtotal.toFixed(2)}
            </div>

            <div className="total-price">
                total: ${(subtotal+(subtotal*0.0875)).toFixed(2)}
            </div>
        </div>
    )
    {tax = 0}{subtotal=0}
}



