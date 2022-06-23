import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState, useEffect} from "react"
import axios from 'axios'
import ProductDetail from "../ProductDetail/ProductDetail"
import NotFound from "../NotFound/NotFound"

export default function App() {
  const [products, setProducts] = useState([]); //can this be var or does it HAVE to be const?
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]); //array of objects with id and quantity
  const [checkoutForm,setCheckoutForm] = useState([]); //contains user info: name and email

  useEffect(async () => {
    await axios.get('https://codepath-store-api.herokuapp.com/store')
      .then(result => setProducts(result.data.products)) 
      .catch(e=>setError(error))
  },[]);

  const handleOnToggle = () => {
    if(isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  const handleAddItemToCart = (productId) => {
    let found = false;
    shoppingCart.forEach((item) => {
      if(item.itemId == productId) {item.quantity = item.quantity + 1; found = true;}
    })

    if (!found) {
      let newCartItem =[];
      newCartItem.itemId = productId;
      newCartItem.quantity = 1;
      setShoppingCart((prevArr) => [...prevArr, newCartItem]);
      return
    }
    setShoppingCart([...shoppingCart])
  }

  const handleRemoveItemFromCart = (productId) => {
    let idx;
    shoppingCart.forEach((item, i) => {
      if(item.itemId == productId) {
        if(item.quantity == 1) {
          idx = i;
        } else {
          item.quantity = item.quantity - 1;
        }
      }
    })

    let newArr = [];
    shoppingCart.forEach((item, i) => {
      if(i != idx) {
        newArr.push(item);
      }
    })

    setShoppingCart(newArr);
  }

  const handleOnCheckoutFormChange = (name, value) => {
    let newForm = [];
    newForm.name = name;
    newForm.value = value;
    setCheckoutForm(newForm);
  }

  const handleOnSubmitCheckoutForm = () => {
    axios.post('https://codepath-store-api.herokuapp.com/store', {
      user: { name: checkoutForm.name, email: checkoutForm.value},
      shoppingCart: shoppingCart
    })

  }

  return (
    <div className="app">
      

      <Sidebar isOpen={isOpen} shoppingCart={shoppingCart} products={products} 
        checkoutForm={checkoutForm} handleOnCheckoutFormChange ={handleOnCheckoutFormChange}
        handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} handleOnToggle={handleOnToggle}/>

      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home products={products} shoppingCart={shoppingCart}
            handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart}/>}/>

          <Route path="/products/:productId" element={<ProductDetail isFetching={isFetching} setIsFetching={setIsFetching} 
            shoppingCart={shoppingCart} handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart}/>}/>

          <Route path="*" element={<NotFound />}/>
          
          {/* <Footer /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
