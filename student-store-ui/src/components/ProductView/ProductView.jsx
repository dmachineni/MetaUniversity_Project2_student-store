import * as React from "react"
import "./ProductView.css"
import { useState} from "react"
import { ProductCard } from "../ProductCard/ProductCard"

export default function ProductView(props) {

    let q = 0;
    let obj =  props.shoppingCart.find((item) => props.product.id == item.itemId);
    if(obj != undefined) {
        q = obj.quantity;
    }
    return (
        <div className="product-view">
            <h1 className="product-id">
                Product #{props.productId}
            </h1>
            <ProductCard product={props.product} showDescription={true} quantity={q} 
            productId = {props.productId} handleAddItemToCart={props.handleAddItemToCart} 
            handleRemoveItemFromCart={props.handleRemoveItemFromCart}/>
        </div>
    )
}