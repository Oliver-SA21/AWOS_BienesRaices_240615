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

 const emailResetearPassword = async(datos) => {
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
    from: 'BieneRaices-240615.com',
    to: email, 
    subject: 'Solicitud de restauración de contraseña - BienesRaices-MATRICULA.com',
    html: `
        <p>¡Hola! ${nombre}, hemos recibido tu solicitud para restaurar la contraseña de tu cuenta</p>
        <hr>
        <p>Por favor accede a la siguiente liga para realizar la actualización :  
        <a href="localhost:${process.env.PORT}/auth/actualizarPassword/${token}">Restablece tu contraseña</a></p>
        <p>En caso de que no hayas solicitado la restauración de contraseña, ignora este correo electrónico.
        </p>`
 });
 }
 
 export {emailRegistro, emailResetearPassword}