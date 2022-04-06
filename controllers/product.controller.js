const { getProductsService, insertProductService } = require('../services/product.service.js')

const getProductController = async(req, res) => {
    const products = await getProductsService()
    res.json(products)
}

const insertProductController = async(req, res) => {
    const product = req.body
    const productReturn = await insertProductService(product)
    res.status(201).json(productReturn)
}

module.exports = { getProductController, insertProductController }