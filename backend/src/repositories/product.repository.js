const { Products } = require('../models');

class ProductRepository {
    async getAllProducts() {
        return await Products.findAll();
    }
    
    async getProductById(productId) {
        return await Products.findByPk(productId);
    }
    
    async addProduct(productData) {
        return await Products.create(productData);
    }
    async updateProduct(productId, productData) {
        return await Products.update(productData, { where: { id: productId } });
    }

    async deleteProduct(productId) {
        return await Products.destroy({ where: { id: productId } });
    }
    
    async getProductsByCategory(category) {
        return await Products.findAll({ where: { category } });
    }
    
    async getProductsByRating(rating) {
        return await Products.findAll({ where: { rating } });
    }
    
    async updateProductRating(productId, ratingData) {
        const product = await Products.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        return await product.update(ratingData);

    }

    async getProductsByPriceRange(minPrice, maxPrice) {
        return await Products.findAll({ where: { price: { [Op.between]: [minPrice, maxPrice] } } });
    }

    async getProductsWithDiscount() {
        return await Products.findAll({ where: { discount: { [Op.gt]: 0 } } });
    }
    
    async searchProducts(searchTerm){
        return await Products.findAll([where: {desc.includes(searchTerm) || title.includes(searchTerm)}]) // need to be edited
    }
    
    

}


module.exports = ProductRepository;