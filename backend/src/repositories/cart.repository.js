const mongoose = require("mongoose");
const { Cart } = require("../models");

class CartRepository {
  _normalizeProductId(val) {
    if (val == null) return val;
    if (typeof val === "string" && /^[0-9a-fA-F]{24}$/.test(val)) {
      try {
        return mongoose.Types.ObjectId(val);
      } catch (e) {
        return val;
      }
    }
    if (!isNaN(Number(val))) return Number(val);
    return val;
  }

  async addtoCart(userId, newProduct) {
    const normalizedId = this._normalizeProductId(newProduct.productId);
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => String(p.productId) === String(newProduct.productId)
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += newProduct.quantity;
      } else {
        cart.products.push({
          productId: normalizedId,
          quantity: newProduct.quantity,
          price: newProduct.price,
        });
      }

      cart.total = (cart.total || 0) + newProduct.quantity * newProduct.price;
      return await cart.save();
    } else {
      const newCart = await Cart.create({
        userId,
        products: [
          {
            productId: normalizedId,
            quantity: newProduct.quantity,
            price: newProduct.price,
          },
        ],
        total: newProduct.quantity * newProduct.price,
      });
      return newCart;
    }
  }

  async getAllCartItems(userId) {
    try {
      // return single cart for the user (client expects one cart object)
      const cart = await Cart.findOne({ userId }).populate("products.productId");
      return cart || null;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw new Error("Could not fetch cart items");
    }
  }

  async updateCart(userId, productId, quantity) {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found for user");

    const productIndex = cart.products.findIndex(
      (p) => String(p.productId) === String(productId)
    );

    if (productIndex === -1) {
      throw new Error("Product not found in cart!");
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();
    return cart;
  }

  async deleteCartItem(cartId) {
    return await Cart.deleteOne({ _id: cartId });
  }
}

module.exports = CartRepository;