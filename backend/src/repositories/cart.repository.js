const {Cart} =require("../models")

class CartRepository{
    async addtoCart(userId, newProduct) {
        // Find the cart of the user
        const cart = await Cart.findOne({ userId });
        if (cart) {
            // Check if the product already exists in the cart
            const productIndex = cart.products.findIndex(p => p.productId === newProduct.productId);
            if (productIndex > -1) {
                // If the product exists, update the quantity
                cart.products[productIndex].quantity += newProduct.quantity;
            } else {
                // If the product doesn't exist, push the new product to the array
                cart.products.push(newProduct);
            }

            // Update the total (assuming newProduct contains its price)
            cart.total += newProduct.quantity * newProduct.price;
            return await cart.save();
        } else {
            // If no cart exists for the user, create a new one
            const newCart = await Cart.create({
                userId,
                products: [newProduct],
                total: newProduct.quantity * newProduct.price
            });
            return newCart;
        }
    }

    async getAllCartItems(userId){
        try {
            const cartItems = await Cart.find({ userId: userId });
            return cartItems;
        } catch (error) {
            console.error("Error fetching cart items:", error);
            throw new Error("Could not fetch cart items");
        }
    
    }
    
    async updateCart(userId, productId, quantity){
        
        var cart = await Cart.findOne({ userId });

        const productIndex = cart.products.findIndex(p => p.productId === productId);

        if (productIndex === -1) {
            throw new Error("Product not found in cart!");
        }

        // Update the quantity of the product
        cart.products[productIndex].quantity = quantity;

        // Save the cart
        await cart.save();

        return cart;
    }
    
    async deleteCartItem(cartId){
        return await Cart.delete({id: cartId})
    }
}
module.exports = CartRepository;