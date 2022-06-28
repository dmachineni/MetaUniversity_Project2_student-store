const express = require('express')
const router = express.Router()
const store = require('../models/store');

router.get('/', (req,res,next)=>{
    try {
        products = store.allProducts()
        console.log("hi")
        res.status(200).send({"products": products})
    } 
    catch(error) {
        next(error)
    }
})

router.get('/:productId',(req, res, next)=>{
    try {
        console.log('params', typeof(req.params.productId))
        product = store.fetchProduct(req.params.productId);
        res.status(200).send({"product":product})
    } 
    catch(error) {
        next(error)
    }
})

router.post('/', (req,res,next)=>{
    try {
        let purchase = store.createPurchase(req.body.shoppingCart,req.body.checkoutForm)
        res.status(201).send({"purchase" : purchase})
    } catch (error) {
        next(error)
    }
})

module.exports = router