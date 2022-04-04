const { Router } = require('express')
const { getProductController, insertProductController }  = require('../controllers/product.controller.js')

const routerProduct = new Router()

routerProduct.get('/', getProductController)
routerProduct.post('/', insertProductController)

module.exports = { routerProduct }