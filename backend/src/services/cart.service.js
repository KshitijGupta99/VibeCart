const { CartRepository } = require("../repositories");

class CartServices {
  constructor() {
    this.cartRepo = new CartRepository();
  }

  // add product to user's cart
  async addtoCart(userId, productData) {
    return await this.cartRepo.addtoCart(userId, productData);
  }

  // return single cart for a user (controller will wrap into array for client compatibility)
  async getCartByUserId(userId) {
    return await this.cartRepo.getAllCartItems(userId);
  }

  // update quantity for a product in user's cart
  async updateCart(userId, productId, quantity) {
    return await this.cartRepo.updateCart(userId, productId, quantity);
  }

  // remove item / delete cart entry (by product or cartId depending on implementation)
  async removeFromCart(cartId) {
    return await this.cartRepo.deleteCartItem(cartId);
  }
}

module.exports = CartServices;