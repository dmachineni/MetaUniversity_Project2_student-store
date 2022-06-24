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
import Footer from "../Footer/Footer"

export default function App() {
  const [products, setProducts] = useState([]); //state vars have to be const because you want to use the function to change and not be able to directly change the var
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]); //array of objects with id and quantity
  const [checkoutForm,setCheckoutForm] = useState({name:'', email:''}); //contains user info: name and email
  const [noError, setNoError] = useState(true);
  const [search, setSearch] = useState();
  const [searchFilteredProducts, setSearchFilteredProducts] = useState([]);
  const [receipt, setReceipt] = useState();

  useEffect(async () => {
    await axios.get('https://codepath-store-api.herokuapp.com/store')
      .then(result => {setProducts(result.data.products); setFilteredProducts(result.data.products); setSearchFilteredProducts(result.data.products)}) 
      .catch(e=>setError(error))
  },[]);

  // useEffect(() => {
  //   setSearchFilteredProducts(filteredProducts);
  // }, [filteredProducts])

  const handleOnSearchChange = (searchInput) => {
    // setSearchFilteredProducts(filteredProducts);
    console.log('search',searchInput)
    console.log('filtered products', filteredProducts)
    let filtered = [];
    filteredProducts.map((p)=>{
      if(p.name.toLowerCase().includes(searchInput.toLowerCase())) {
        filtered.push(p);
      }
    })
    console.log('final',filtered)
    setSearchFilteredProducts(filtered);
  }

  const handleCategoryChange = (categoryName) => {
    if (categoryName === "all") {
      setFilteredProducts(products);
      setSearchFilteredProducts(products);
    } else {
      let filtered = [];
      products.map((p)=>{
        if(p.category === categoryName) {
          filtered.push(p);
        }
      })
      setFilteredProducts(filtered);
      setSearchFilteredProducts(filtered);
    }

  }

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
        setReceipt(r.data.purchase.receipt.lines)
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
      <BrowserRouter>
      <div className="main">
        <Sidebar receipt={receipt} isOpen={isOpen} shoppingCart={shoppingCart} products={products} 
        checkoutForm={checkoutForm} handleOnCheckoutFormChange ={handleOnCheckoutFormChange}
        handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} handleOnToggle={handleOnToggle}
        setShoppingCart={setShoppingCart} setCheckoutForm={setCheckoutForm} noError={noError} error={error}/>

        <div className="app-excluding-sidebar">
          <Navbar />
          <Routes>
            <Route path="/" element={
            <div>
              <Home products={searchFilteredProducts} shoppingCart={shoppingCart} handleOnSearchChange={handleOnSearchChange}
                handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart} 
                search={search} setSearch={setSearch} handleCategoryChange={handleCategoryChange} /> 
              <Footer />
            </div>}/>

            <Route path="/products/:productId" element={
              <div>
                <ProductDetail isFetching={isFetching} setIsFetching={setIsFetching} 
                  shoppingCart={shoppingCart} handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart}/>
                <Footer />
              </div>  
            }/>

            <Route path="*" element={
              <div>
                <NotFound />
                <Footer />
              </div>}/>
          </Routes>
        </div>
      </div>
      </BrowserRouter>
    </div>

  )
}
