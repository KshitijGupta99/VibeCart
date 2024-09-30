const {ProductService} = require('../services')

class ProductController {
    constructor(req, res) {
        this.productService = new ProductService()
    }
    
    // Get all products
    getAllProducts = async (req, res) => {
        try {
            const products = await this.productService.getAllProducts()
            res.status(200).json(products)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }

    // Get a single product by ID
    getProductById = async (req, res) => {
        try {
            const product = await this.productService.getProductById(req.params.id)
            if (!product) return res.status(404).send('Product not found')
            res.status(200).json(product)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    
    // Add a new product
    addProduct = async (req, res) => {
        try {
            const product = await this.productService.addProduct(req.body)
            res.status(201).json(product)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    
    // Update an existing product
    updateProduct = async (req, res) => {
        try {
            const product = await this.productService.updateProduct(req.params.id, req.body)
            if (!product) return res.status(404).send('Product not found')
            res.status(200).json(product)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }

    searchProduct = async(req,res)=>{
        try {
            const product = await this.productService.searchProduct(req.query.search)
            if (!product) return res.status(404).send('Product not found')
            res.status(200).json(product)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }

    
    
    
}