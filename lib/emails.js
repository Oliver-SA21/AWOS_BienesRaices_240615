 import nodemailer from 'nodemailer'

 const emailRegistro = async(datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASSWORD
        }
    })
 

 const {email, nombre, token}= datos 

 await transport.sendMail({
    from: 'BieneRaices-MATRICULA.com',
    to: email, 
    subject: 'Bienvenid@ a la Plataforma de Bienes Raíces - Confirma tu cuenta',
    html: `
        <p>Hola! ${nombre}, comprueba tu cuenta en bienesraices_matricula.com</p>
        <hr>
        <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace :  
        <a href="localhost:${process.env.PORT}/auth/confirma/${token}">Confirmar Cuenta</a></p>
        <p>En caso de que no seas tú, quien creo la cuenta ignora este correo electrónico.
        </p>`
 });
 }
 
 export {emailRegistro}