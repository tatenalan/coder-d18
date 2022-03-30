import express from 'express'
import ProductController from '../../controllers/web/ProductController.js';

const productWebRouter = express.Router();

productWebRouter.get('/', ProductController.getAll);

export { productWebRouter };