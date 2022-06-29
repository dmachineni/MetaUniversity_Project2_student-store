const {storage} = require("../data/storage.js")
const { BadRequestError, NotFoundError } = require('../utils/errors')



class Store {
    //helper functions
    static orderTotal(cart) {
        let items = storage.get('products');
        let total = 0;
        cart.forEach(item => {
            let product = items.find((p) => (item.itemId == p.id))
            total += product.price * item.quantity;
        })

        return (total)
    }

    static checkCart(cart) {
        cart.forEach(item => {
            if (!item.itemId || !item.quantity) {
                return false;
            }
        });
        const duplicate = cart.filter((item, index) => cart.indexOf(item) !== index)
        if (duplicate.length != 0) {
            return false;
        }
        return true;
    }

    //total Rice Krispies purchased at a cost of $0.99 for a total cost of $5.94.Before taxes, the subtotal was $5.94After taxes and fees were applied, the total comes out to $6.46"
    static generateReceipt(cart) {
        let toReturn = ``;
        cart.forEach((item) => {
            let items = storage.get('products');
            let product = items.find((p) => (item.itemId == p.id))
            toReturn += `${item.quantity} total ${product.name} purchased at a cost of $${product.price}. `
        })

        toReturn += `The total cost is $${(this.orderTotal(cart)).toFixed(2)}. `
        toReturn += `After taxes and fees were applied, the total comes out to $${(this.orderTotal(cart)*1.0875).toFixed(2)}.`
        
        return toReturn;
    }

    //functions called in routes store.js
    static allProducts() {
        return storage.get('products');
    }

    static fetchProduct(productId) {
        let items = storage.get('products');
        let toReturn = items.find((item) => {return item.id == productId});
        if (!toReturn) {
            throw new NotFoundError();
        }
    }

    static createPurchase(cart,userInfo) {
        if (!userInfo || !userInfo.name || !userInfo.email) {
            throw new BadRequestError("Invalid user info")
        }
        if (!cart || cart.length==0) {
            throw new BadRequestError("Invalid cart")
        }
        if(!this.checkCart(cart)) {
            throw new BadRequestError("Incorrect cart details")
        }

        let purchase = {
            id: storage.get('purchases').length,
            name: userInfo.name,
            email:userInfo.email,
            order:cart,
            total:(this.orderTotal(cart)*1.0875),
            createdAt: new Date().toLocaleString(),
            receipt: this.generateReceipt(cart) 
        }

        storage.add('purchases',purchase);

        //cart is an array of objects; each obj contains an id and quantity

        return purchase;
    }

}
module.exports = Store