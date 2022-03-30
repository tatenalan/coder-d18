import ProductTestDao from '../../dao/ProductTestDao.js'
import AuthenticationException from '../../exceptions/AuthenticationException.js'
import MessageDao from '../../dao/MessageDao.js'
import UserDao from '../../dao/UserDao.js'
import CartDao from '../../dao/CartDao.js'
import bCrypt from "bcrypt"
import User from '../../models/User.js'
import { sendEmail, sendWpp, welcomeEmail } from '../../../options/Sender.js'

class GeneralWebController {

    isValidUser(user, password) {
        return bCrypt.compareSync(password, user.password)
    }
    createHash(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
    }

    getAll =  async (req, res) => {
        try {
            let productList = await ProductTestDao.getAll()
            let messages = await MessageDao.getAll()
            res.render('index', { productList, messages })
        }
        catch(err) {
            res.json(err)
        }
    }

    redirect =  async (req, res) => {
        res.redirect('/LogIn');
    }

    getLogIn =  async (req, res) => {
        res.render('./index/LogIn')
    }

    postLogIn =  async (req, res) => {
        const { username, password } = req.body
        console.log(username, password)
        UserDao.getByUsername(username).then(user => {
            console.log(user)
            console.log(bCrypt.compareSync(password, user.password))
            if(!this.isValidUser(user, password))
                res.render('./messagesScreen/Error', {message: "La contraseña es Incorrecta"})
                //res.json(new AuthenticationException(401, "La contraseña es Incorrecta"))
            else{
                req.session.idUser = user._id
                req.session.name = user.name
                req.session.username = username
                req.session.email = user.email
                req.session.address = user.address
                req.session.avatar = user.avatar
                req.session.age = user.age
                req.session.phone = user.phone
                req.session.contador = 0
                res.redirect('/products')
            }
        }).catch(err => {
            console.log(err)
            res.render('./messagesScreen/Error', {message: err.message})
            //res.json(new AuthenticationException(401, "El usuario no existe"))
        })
    }

    postLogOut =  async (req, res) => {
        res.render('./index/LogOut', {username: req.session.username})
    }

    getRegister =  async (req, res) => {
        res.render('./index/Register')
    }

    postRegister =  async (req, res) => {
        const { email, username, name, address, age, phone, password } = req.body
        const avatar = req.file ? req.file.filename : "";
        UserDao.verifyUsername(username).then(user => {
            if(!user){
                UserDao.save(email, username, name, address, age, phone, this.createHash(password), avatar).then((user) => {
                    CartDao.save(user.id).then(async () => {
                        sendEmail("Nuevo Registro", await welcomeEmail(req.body)).then((response) => {
                            if (response)
                                res.render('./messagesScreen/Success', {message: "Usuario " + username + " Creado existosamente"})
                            else 
                                res.render('./messagesScreen/Error', {message: "error"})
                        })
                    }).catch(err => {
                        console.log(err)
                        res.render('./messagesScreen/Error', {message: err.message})
                    })
                }).catch(err => {
                    console.log(err)
                    res.render('./messagesScreen/Error', {message: err.message})
                })
            }
            else{
                res.render('./messagesScreen/Error', {message: "El usuario " + username + " ya existe"})
            }
        }).catch(err => {
            console.log(err)
            //res.render('./messagesScreen/Error', {message: err.message})
            //res.json(new AuthenticationException(401, "El usuario no existe"))
        })
    }

    getProfile = async (req, res) => {
        res.render('./profile/Profile')
    }
}
export default new GeneralWebController();
