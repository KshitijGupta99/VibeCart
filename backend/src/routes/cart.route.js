const express = require("express");
const router = express.Router();

const { CartController } = require("../controllers");

const cartController = new CartController();

router.post("/addProductToCart/:userId/add", cartController.addToCart);

// NEW: get cart for a user (client expects array shape)
router.get("/getCart/:userId", cartController.getCart);

// ALIAS: keep old frontend-compatible endpoint so existing client calls succeed
router.get("/getcartdetails/:userId", cartController.getCart);

router.post("/removeProductFromCart", cartController.removeFromCart);

module.exports = router;