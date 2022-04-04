const { getProductsService, insertProductService } = require('../services/product.service.js')

const getProductController = async(req, res) => {
    const products = await getProductsService()
    console.log(products);
    res.json(products)
}

const insertProductController = (req, res) => {
    const product = req.body
    const productReturn = insertProductService(product)
    res.status(201).json(productReturn)
}

module.exports = { getProductController, insertProductController }