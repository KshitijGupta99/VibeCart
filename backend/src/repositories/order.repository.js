const {Order} =require("../models")
class OrderRepository{
    
    async getAllOrders(){
        return await Order.find();
    }
    
    async getOrderById(orderId){
        return await Order.findById(id);
    }
    
    async addOrder(orderData){
        return await Order.create(orderData);
    }
    
    async updateOrder(orderId, orderData){
        return await Order.update(orderData, {id: orderId});
    }
    
    async deleteOrder(orderId){
        return await Order.deleteOne({id: orderId});
    }
    
    async getOrdersByUserId(userId){
        return await Order.find( {userId});
    }
    
    async getOrdersByProductId(productId){
        return await Order.find({productId});
    }

    async getOrdersByStatus(status){
        return await Order.find({status});
    }


}

module.exports = OrderRepository