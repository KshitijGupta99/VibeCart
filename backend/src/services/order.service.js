const {OrderRepository} = require("../repositories")

class OrderService {
    constructor() {
        this.orderRepository = new OrderRepository();
    }
    
    async getAllOrders() {
        return await this.orderRepository.getAllOrders();
    }
    
    async getOrderById(orderId) {
        return await this.orderRepository.getOrderById(orderId);
    }
    
    async addOrder(orderData) {
        return await this.orderRepository.addOrder(orderData);
    }
    
    async updateOrder(orderId, orderData) {
        return await this.orderRepository.updateOrder(orderId, orderData);
    }
    
    async deleteOrder(orderId) {
        return await this.orderRepository.deleteOrder(orderId);
    }
    
    async getOrdersByUserId(userId) {
        return await this.orderRepository.getOrdersByUserId(userId);
    }
    
    async getOrdersByProductId(productId) {
        return await this.orderRepository.getOrdersByProductId(productId);
    }
    
    async getOrdersByStatus(status) {
        return await this.orderRepository.getOrdersByStatus(status);
    }
    

}

module.exports = OrderService;