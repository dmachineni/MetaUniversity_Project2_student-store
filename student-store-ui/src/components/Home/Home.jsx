import * as React from "react"
import "./Home.css"

export default function Home(props) {
  return (
    <div className="home">
      <Hero />
      <ProductGrid products={props.products} shoppingCart ={props.shoppingCart}
        handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemFromCart={props.handleRemoveItemFromCart}/>
    </div>
  )
}

export function Hero(props) {
  return (
    <div className="hero">
      <p className="intro">Welcome! </p>
      <img className="hero-img" src='https://www.pngitem.com/pimgs/m/296-2968709_grocery-clipart-convenience-store-grocery-store-shop-clipart.png'></img> 
    </div>
  )
}

export function ProductGrid(props) {
  return (
    <div className="product-grid">
      {props.products.map((product, idx) => {
        let q = 0;
        let obj =  props.shoppingCart.find((item) => product.id == item.id);
        console.log(obj)
        if(obj != undefined) {
          q = obj.quantity;
        }

        return <ProductCard key={idx} product={product} showDescription={false} quantity={q}
          productId = {product.id} handleAddItemToCart={props.handleAddItemToCart} 
          handleRemoveItemFromCart={props.handleRemoveItemFromCart}
          />
      }) }
    </div>
  )
}

export function ProductCard(props) {
  const retreiveQuantity = () => {
    q = props.quantity
    if(q == 0) {
      return ""
    } else{

    }
  }
  return (
    <div className="product-card">
      <p className = "product-img">
        <img className="img" src={props.product.image}></img>  
      </p>

      <p className = "product-name" >
          {props.product.name}
      </p>

      <p className = "product-price"> 
          $ {props.product.price}
      </p>


        <p className={props.showDescription ? "product-description":"product-description hidden"}>
          {props.product.description}
        </p>

      <button className="add" onClick={()=>props.handleAddItemToCart(props.product.id)}>+</button>

      <button className="remove" onClick={
        ()=>props.handleRemoveItemFromCart(props.product.id)}>-</button>

      <div className="product-quantity">
        {(props.quantity === 0 || props.quantity === undefined) ? "":props.quantity}
        {/* ternary: (conditions) ?(if) true do this:false do this */}

      </div>
    </div>
  )
  
}
