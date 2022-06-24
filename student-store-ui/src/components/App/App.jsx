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
  const [products, setProducts] = useState([]); //state vars have to be const because you want to use the function to change and not be able to directly change the var
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]); //array of objects with id and quantity
  const [checkoutForm,setCheckoutForm] = useState({name:'', email:''}); //contains user info: name and email
  const [noError, setNoError] = useState(true);

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
      let newCartItem ={itemId : productId, quantity : 1};
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

  const handleOnCheckoutFormChange = (label, value) => {
    let newForm = {...checkoutForm};
    newForm[label]=value;
    console.log('handleOnCheckoutFormChange',newForm)
    setCheckoutForm(newForm);
  }

  const handleOnSubmitCheckoutForm = async () => {
    await axios.post('https://codepath-store-api.herokuapp.com/store', {
      user: { name: checkoutForm.name, email: checkoutForm.email},
      shoppingCart: shoppingCart
    })
      .then((r)=>{
        setShoppingCart([]);
        let done = {name:"", email:""}
        setCheckoutForm(done);
        setNoError(true);
      })
      .catch((e)=>{
        console.log('error', e)
        setNoError(false);
        setError(e);
      })
  }
  

  return (
    <div className="app">
      <Sidebar isOpen={isOpen} shoppingCart={shoppingCart} products={products} 
        checkoutForm={checkoutForm} handleOnCheckoutFormChange ={handleOnCheckoutFormChange}
        handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} handleOnToggle={handleOnToggle}
        setShoppingCart={setShoppingCart} setCheckoutForm={setCheckoutForm} noError={noError} error={error}/>

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
