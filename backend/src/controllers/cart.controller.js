const { CartServices } = require("../services")


class CartController {
    constructor(req, res) {
        this.orderServices = new OrderServices()
    }
}

module.exports = CartController;