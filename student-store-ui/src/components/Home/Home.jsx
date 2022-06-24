import * as React from "react"
import "./Home.css"
import { Hero } from "../Hero/Hero"
import ProductGrid from "../ProductGrid/ProductGrid"
import Search from "../Search/Search"

export default function Home(props) {
  return (
    <div className="home">
      <Hero />
      <Search search={props.search} setSearch={props.setSearch} handleCategoryChange={props.handleCategoryChange}
        products={props.products} shoppingCart ={props.shoppingCart} handleOnSearchChange ={props.handleOnSearchChange}
        handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemFromCart={props.handleRemoveItemFromCart}/>
      <ProductGrid products={props.products} shoppingCart ={props.shoppingCart}
        handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemFromCart={props.handleRemoveItemFromCart}/>
    </div>
  )
}
