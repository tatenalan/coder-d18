const { getProducts, insertProduct } = require('../models/products.js')

const getProductsService = async() => {
    return await getProducts()
}

const insertProductService = (product) => {
    return insertProduct(product)
}

module.exports = { getProductsService, insertProductService }