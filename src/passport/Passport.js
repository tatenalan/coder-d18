import passport from "passport";
import LocalStrategy from "passport-local"
import bCrypt from "bcrypt"
import User from "../models/User.js"

class Passport {
    constructor(app) {
        app.use(passport.initialize())
        app.use(passport.session())
        this.init()
    }
    init(){
        this.logIn()
        this.singUp()
    }

    isValidUser(user, password) {
        return bCrypt.compareSync(password, user.password)
    }
    createHash(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
    }
    logIn() {
        passport.use("login",
            new LocalStrategy((username, password, done) => {
                UserDao.getByUsername(username).then(user => {
                    if (!user || isValidUser(user, password)) {
                        return done(new AuthenticationException(401, "La contraseña es Incorrecta"))
                    }
                    return done(null, user)
                }).catch(err => {
                    console.log(err)
                    return done(new AuthenticationException(401, "El usuario no existe"))
                }
                )
            }
            )
        )
    }
    singUp() {
        passport.use("singUp",
            new LocalStrategy({passReqToCallback: true},(req, username, password, done) => {
                UserDao.getByUsername(username).then(user => {
                    if (user) {
                        return done(new AuthenticationException(401, "User already exist"))
                    }
                    let newUser = new User(username, createHash(password))
                    return done(null, newUser)
                }).catch(err => {
                    console.log(err)
                    return done(new AuthenticationException(401, "El usuario no existe"))
                }
                )
            }
            )
        )
    }
    passportLogIn(){
        return passport.authenticate("login", {failureRedirect: '/failLogin'})
    }
    passportRegister(){
        return passport.authenticate("register", {failureRedirect: '/failLogin'})
    }
}

export default Passport