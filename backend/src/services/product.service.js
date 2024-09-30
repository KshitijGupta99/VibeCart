const {ProductRepository} = require("../repositories");

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }
    
    async getAllProducts() {
        return await this.productRepository.getAllProducts();
    }

    async getProductById(productId) {
        return await this.productRepository.getProductById(productId);
    }

    async addProduct(productData) {
        return await this.productRepository.addProduct(productData);
    }

    async updateProduct(productId, productData) {
        return await this.productRepository.updateProduct(productId, productData);
    }

    async deleteProduct(productId) {
        return await this.productRepository.deleteProduct(productId);
    }

    async getProductsByCategory(category) {
        return await this.productRepository.getProductsByCategory(category);
    }

    async getProductsByRating(rating) {
        return await this.productRepository.getProductsByRating(rating);
    }

    async searchProducts(searchTerm) {
        return await this.productRepository.searchProducts(searchTerm);
    }

    async getProductsByPriceRange(minPrice, maxPrice) {
        return await this.productRepository.getProductsByPriceRange(minPrice, maxPrice);
    }



}
 