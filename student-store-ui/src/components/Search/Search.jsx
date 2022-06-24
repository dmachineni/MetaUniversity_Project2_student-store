import * as React from "react"
import ProductGrid from "../ProductGrid/ProductGrid";
import "./Search.css"

export default function Search(props) {
    // let clothingProducts = [];
    // props.products.map((p)=>{
    //         if(p.category == "clothing") {
    //             clothingProducts.push(p);
    //         }
    //     }
    // )
    // let foodProducts = [];
    // props.products.map((p)=>{
    //         if(p.category == "food") {
    //             foodProducts.push(p);
    //         }
    //     }
    // )
    // let accessoriesProducts = [];
    // props.products.map((p)=>{
    //         if(p.category == "accessories") {
    //             accessoriesProducts.push(p);
    //         }
    //     }
    // )
    // let techProducts = [];
    // props.products.map((p)=>{
    //         if(p.category == "tech") {
    //             techProducts.push(p);
    //         }
    //     }
    // )


    // function display(item) {
    //     <ProductGrid products={item} shoppingCart ={props.shoppingCart}
    //         handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemFromCart={props.handleRemoveItemFromCart}/>
    // }

    return (
        <div>
            <div className="search-bar">
                <input type = "text" id = "search" placeholder="Search for a product here" onChange={(e)=>props.handleOnSearchChange(e.target.value)}></input>
            </div> 

            <div className="categories">
                <div className="categories-label">Categories</div>
                <button className="All Categories" onClick={() => props.handleCategoryChange("all")}>All Categories</button>
                <button className="Clothing" onClick={() => props.handleCategoryChange("clothing")}>Clothing</button>
                <button className="Food" onClick={() => props.handleCategoryChange("food")}>Food</button>
                <button className="Accessories" onClick={()=>props.handleCategoryChange("accessories")}>Accessories</button>
                <button className="Tech" onClick={()=>props.handleCategoryChange("tech")}>Tech</button>
            </div>

        </div>
    )
}

