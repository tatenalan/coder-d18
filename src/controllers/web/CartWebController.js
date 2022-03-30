import CartDao from '../../dao/CartDao.js'
import { sendEmail, sendWpp, orderEmail } from '../../../options/Sender.js'

class ProductController {

    getCart = async (req, res) => {
        CartDao.getByIdUser(req.session.idUser).then(cart => {
            console.log(cart.products)
            res.render("./cart/CartMain", {productList: cart.products, username: req.session.username, id: cart.id})
        }).catch(err => {
            if(err.error == 404)
                res.render("./cart/CartMain", {productList: [], username: req.session.username})
            else{
                res.status(err.error)
                res.json(err)
            }
        })
    }
    addProduct = async (req, res) => {
        CartDao.addProduct(req.session.idUser, req.body).then((response) => {
            console.log(response)
            res.render('./messagesScreen/Success', {message: response.response, idUser: req.session.idUser})
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    sendOrder = async (req, res) => {
        let subject = `Nuevo pedido de ${req.session.name}, email: ${req.session.email}`
        sendEmail(subject, await orderEmail(req.body.products)).then((response) => {
            sendWpp(subject).then((response) => { 
                res.render('./messagesScreen/Success', {message: "Se está procesando su pedido", idUser: req.session.idUser})
             }).catch(err => {
                res.status(err.error)
                res.json(err)
            })
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }
}
export default new ProductController();
