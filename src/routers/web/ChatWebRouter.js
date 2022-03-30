import express from 'express'
import { adminMiddleware } from '../../middleware/AdminMiddleware.js'
import MessageController from '../../controllers/web/MessageWebController.js'

const chatWebRouter = express.Router();

chatWebRouter.get('/', adminMiddleware, MessageController.getAll)

/* chatWebRouter.get('/:id', MessageController.getById)

chatWebRouter.post('/',  MessageController.save)

chatWebRouter.delete('/:id', MessageController.deleteById)

chatWebRouter.delete('/', MessageController.deleteAll) */

export {chatWebRouter};