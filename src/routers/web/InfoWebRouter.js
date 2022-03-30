import express from 'express'
import InfoWebController from '../../controllers/web/InfoWebController.js'

const infoWebRouter = express.Router();

infoWebRouter.get("/", InfoWebController.getInfo)

export {infoWebRouter};