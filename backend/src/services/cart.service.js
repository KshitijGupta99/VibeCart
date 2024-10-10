const{CartRepository} = require('../repositories')

class CartServices{
    constructor(){
        this.cartRepository = new CartRepository()
    }
    
    //to add
    async addtoCart(userId, productData){
        return await this.cartRepository.addtoCart(userId, productData);
    }
    
    //to remove
    async removeFromCart(productId){
        return await this.cartRepository.removeFromCart(productId)
    }
    
    //to update
    async updateCart(productId, quantity){
        return await this.cartRepository.updateCart(productId, quantity)
    }
    
    //to get all
    async getAllCartItems(userid){
        return await this.cartRepository.getAllCartItems(userid)
    }

}
module.exports = CartServices