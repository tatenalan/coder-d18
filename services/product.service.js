const { getProducts, insertProduct } = require('../models/product.model.js')

const getProductsService = async() => {
    return await getProducts()
}

const insertProductService = (product) => {
    return insertProduct(product)
}

module.exports = { getProductsService, insertProductService }