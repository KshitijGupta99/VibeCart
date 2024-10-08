const { ProductService } = require('../services');

class ProductController {
    constructor() {
        this.productService = new ProductService(); // Removed unnecessary params in constructor
    }
    
    getAllProducts = async (req, res) => {
        try {
            const products = await this.productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    };

    getProductById = async (req, res) => {
        try {
            const product = await this.productService.getProductById(req.body.product_id); // Changed from req.params.id to req.body.id
            if (!product) return res.status(404).send('Product not found');
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    };
    
    addProduct = async (req, res) => {
        try {
            const product = await this.productService.addProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    };

    updateProduct = async (req, res) => {
        try {
            const product = await this.productService.updateProduct(req.body.id, req.body);
            if (!product) return res.status(404).send('Product not found');
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    };

    searchProduct = async (req, res) => {
        try {
            const product = await this.productService.searchProducts(req.query.search);
            if (!product) return res.status(404).send('Product not found');
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    };
}

module.exports = ProductController;
