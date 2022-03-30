import express from 'express'
import CartWebController from '../../controllers/web/CartWebController.js';

const cartWebRouter = express.Router();

cartWebRouter.get('/', CartWebController.getCart);

cartWebRouter.post('/addToCart', CartWebController.addProduct)

cartWebRouter.post('/sendOrder', CartWebController.sendOrder)

export { cartWebRouter };