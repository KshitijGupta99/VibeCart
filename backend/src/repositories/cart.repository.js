const {Cart} =require("../models")

class CartRepository{
    async addtoCart(data){
        return await Cart.create(data)
    }

    async getAllCartItems(userId){
        return await Cart.find({userId})
    }
    
    async updateCartItem(productId, quantity){
        return await Cart.updateOne({id: productid}, {quantity: quantity})
    }
    
    async deleteCartItem(cartId){
        return await Cart.delete({id: cartId})
    }
}
module.exports = CartRepository;