const { CartService } = require("../services");

class CartController {
  constructor() {
    this.cartService = new CartService();
  }

  // Add item to cart
  addToCart = async (req, res) => {
    try {
      const userId = req.params.userId;
      const productData = req.body;
      const result = await this.cartService.addtoCart(userId, productData);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error in addToCart:", error);
      return res.status(500).json({ error: error.message || "Internal error" });
    }
  };

  // Get cart for a user (returns an array with cart as the first element to keep client compatibility)
  getCart = async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await this.cartService.getCartByUserId(userId);
      // client expects data[0].products — keep that shape
      if (!cart) return res.status(200).json([]);
      return res.status(200).json([cart]);
    } catch (error) {
      console.error("Error in getCart:", error);
      return res.status(500).json({ error: error.message || "Internal error" });
    }
  };

  // Remove item from cart
  removeFromCart = async (req, res) => {
    try {
      const { cartId } = req.body;
      await this.cartService.removeFromCart(cartId);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error in removeFromCart:", error);
      return res.status(500).json({ error: error.message || "Internal error" });
    }
  };
}

module.exports = CartController;