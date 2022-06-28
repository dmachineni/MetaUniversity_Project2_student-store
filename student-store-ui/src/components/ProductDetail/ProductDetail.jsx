import * as React from "react"
import "./ProductDetail.css"
import { useState, useEffect} from "react"
import axios from 'axios'
import ProductView from "../ProductView/ProductView"
import{useParams} from "react-router-dom"
import NotFound from "../NotFound/NotFound"
import { Link } from "react-router-dom";

export default function ProductDetail(props) {
    const [product, setProduct] = useState([]);
    const params = useParams();
    
    async function getProductData(){
        props.setIsFetching(true)
        await axios.get(`http://localhost:3001/store/${params.productId}`)
                .then(result => {setProduct(result.data.product); props.setIsFetching(false)})
        
    }

    useEffect(() => {
       getProductData()
      },[]);

    
    return (
        <div className="product-detail">  
            {props.isFetching ? <h1 className="loading">Loading...</h1>: 
                typeof product === undefined ? <NotFound /> : 
                <ProductView product={product} productId={params.productId} shoppingCart ={props.shoppingCart}
                handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemFromCart={props.handleRemoveItemFromCart}/>}
             
        </div>
    )
}