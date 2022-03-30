import { createTransport } from 'nodemailer';
import twilio from "twilio";
import ServiceException from "../src/exceptions/ServiceException.js"

const accountSid = process.env.TWILIO_ACCOUNT_SID || "AC795bc029cf78d374baf92dbc627e149a";
const authToken = process.env.TWILIO_AUTH_TOKEN || "2a511a340ef8350cf4126f9e69510f36";
const client = twilio(accountSid, authToken);
const TEST_MAIL = process.env.ADMINEMAIL || "lisandrorp1997@gmail.com";
const TEST_NUMBER = process.env.ADMINNUMBER || "+5491144373492";

/* const transporter = createTransport({
    name: 'example.com',
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: 'taya.klein42@ethereal.email',
        pass: '12v4CwCqb1jnqEHQqK'
    },
}); */

const welcomeEmail = async (body) => {
    return (
        `<h1>Welcome to our website! ${body.username}</h1>
        <h3>Username: ${body.username}</h3>
        <h3>Email: ${body.email}</h3>
        <h3>Address: ${body.address}</h3>
        <h3>Age: ${body.age}</h3>
        <h3>Phone: ${body.phone}</h3>
        ` // html body
    )
}

const orderEmail = async (body) => {
    let contador = 0;
    let response = "";
    while(body.length > contador){
        response = response + `
            <h3><u>id:</u> ${body[contador]}</h3>
            <h3><u>name:</u> ${body[contador+1]}</h3>
            <h3><u>price:</u> ${body[contador+2]}</h3>
            <h3><u>description:</u> ${body[contador+3]}</h3>
            <img style="width:50px;" src="${body[contador+4]}" alt="">
        `
        contador = contador + 5; 
    }
    return response;
}

const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'taten210@gmail.com',
        pass: 'kusqbbzstfomilfa'
    }
})

const sendEmail = async (subject, body) => {
    let mail = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: TEST_MAIL, // list of receivers
        subject: subject, // Subject line
        text: "body", // plain text body
        /* html: "<b>" + body + "</b>", // html body */
        html: body, // html body
    }
    try {
        let info = await transporter.sendMail(mail)
        console.log("ok")
        console.log(info)
        return true
    }
    catch (error) {
        console.log("mal")
        console.log(error)
        throw new ServiceException(error.error, "No se pudieron traer los productos", error.message)
    }
}

const sendWpp = async (body) => {
    client.messages.create({
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5491144373492',
            body: body,
            //mediaUrl: "Hello world?", 
        })
        .then(message => console.log(message.sid))
        .catch(error => {
            console.log("mal")
            console.log(error)
            throw new ServiceException(error.error, "No se pudieron traer los productos", error.message)
        })
}

export { sendEmail, sendWpp, welcomeEmail, orderEmail };