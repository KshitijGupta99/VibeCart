const { CartService } = require("../services")


class CartController {
    constructor(req, res) {
        this.cartServices = new CartService()
    }
    
    // Add item to cart
    addToCart = async (req, res) => {
        try {
            const { productId, quantity } = req.body;
            const cartItem = await this.cartServices.addtoCart(req.body);
            res.status(201).json(cartItem);
        } catch (error) {
            console.error(error);
        }
    }

    // Remove item from cart
    removeFromCart = async (req, res) => {
        try {
            const { productId } = req.body;
            const cartItem = await this.cartServices.removeFromCart(productId);
            if (!cartItem) return res.status(404).send('Cart item not found');
            res.status(200).json(cartItem);
        } catch (error) {
            console.error(error);
        }
    }
    
    // Get cart items
    getCartItems = async (req, res) => {
        try {
            const cartItems = await this.cartServices.getAllCartItems("userid");
            res.status(200).json(cartItems);
        } catch (error) {
            console.error(error);
        }
    
    }
    
    // Update cart item quantity
    updateCartItemQuantity = async (req, res) => {
        try{
            const { productId, quantity } = req.body;
            const cartItem = await this.cartServices.updateCart(productId, quantity);
            if (!cartItem) return res.status(404).send('Cart item not found');
            res.status(200).json(cartItem);
        }catch(error){
            console.error(error);
        }
    }
}

module.exports = CartController;