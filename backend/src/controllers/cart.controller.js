const { CartService } = require("../services")


class CartController {
    constructor(req, res) {
        this.cartServices = new CartService()
    }
    
    // Add item to cart
    addToCart = async (req, res) => {
        const userId = req.params.userId;  // Assuming you pass userId in the URL like /cart/:userId/add
        const productData = req.body;

        try {
            const updatedCart = await this.cartServices.addtoCart(userId, productData);
            res.status(200).json(updatedCart);
        } catch (error) {
            console.error("Error adding to cart:", error);
            res.status(500).json({ error: "Server Error" });
        }
    }

    // Remove item from cart
    removeFromCart = async (req, res) => {
        try {
            const { productId } = req.body;
            // productId = 
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
            let id = req.params.id;
            const cartItems = await this.cartServices.getAllCartItems(id);
            res.status(200).json(cartItems);
        } catch (error) {
            console.error(error);
        }
    
    }
    
    // Update cart item quantity
    updateCartItemQuantity = async (req, res) => {
        try{
            const userId = req.params.userId;
            const { productId, quantity } = req.body;
            const cartItem = await this.cartServices.updateCart(userId, productId, quantity);
            if (!cartItem) return res.status(404).send('Cart item not found');
            res.status(200).json(cartItem);
        }catch(error){
            console.error(error);
        }
    }
}

module.exports = CartController;