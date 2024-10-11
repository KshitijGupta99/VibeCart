const { Products } = require('../models');

class ProductRepository {
    async getAllProducts() {
        return await Products.find();
    }
    
    async getProductById(productId) {
        console.log(productId, "from product repo");
        return await Products.find( { _id: productId } );
    }
    
    async addProduct(productData) {
        return await Products.create(productData);
    }
    async updateProduct(productId, productData) {
        return await Products.update(productData, { product_id: productId } );
    }

    async deleteProduct(productId) {
        return await Products.deleteOne({ product_id: productId });
    }
    
    async getProductsByCategory(category) {
        return await Products.find({ product_id: productId });
    }
    
    async getProductsByRating(rating) {
        return await Products.find({ where: { rating } });
    }
    
    async updateProductRating(productId, ratingData) {
        const product = await Products.find({ product_id: productId });
        if (!product) {
            throw new Error('Product not found');
        }
        return await product.update(ratingData);

    }

    async getProductsByPriceRange(minPrice, maxPrice) {
        return await Products.find( { price: { [Op.between]: [minPrice, maxPrice] } });
    }

    async getProductsWithDiscount() {
        return await Products.find({ discount: { [Op.gt]: 0 } });
    }
    
    async searchProducts(searchTerm){
        return await Products.find({ 
                [Op.or]: [
                    { title: { [Op.like]: `%${searchTerm}%` } },
                    { description: { [Op.like]: `%${searchTerm}%` } }
                ]
        });
    }
    
    
    

}


module.exports = ProductRepository;