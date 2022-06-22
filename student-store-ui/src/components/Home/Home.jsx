import * as React from "react"
import "./Home.css"

export default function Home(props) {
  return (
    <div className="home">
      <Hero />
      
      { props.products.map((product, idx) => {
        return <ProductCard key={idx} product={product}/>
      }) }
    </div>
  )
}

export function Hero(props) {
  return (
    <div className="hero">
      <div className="intro">Welcome! </div>
      {/* <img className="hero-img" src='https://www.pngitem.com/pimgs/m/296-2968709_grocery-clipart-convenience-store-grocery-store-shop-clipart.png'></img> UNCOMMENT LATER AFTER CSS!!!!*/}
    </div>
  )
}

export function ProductCard(props) {
  return (
    <div className="product-card">
      <p class = "product-img">
        <img class="img" src={props.product.image}></img>  
      </p>

      <p class = "product-name" >
          {props.product.name}
      </p>

      <p class = "product-price"> 
          {/* "$" */}
          {props.product.price}
      </p>
    </div>
  )
  
}
