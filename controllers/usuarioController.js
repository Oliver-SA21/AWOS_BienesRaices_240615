import {check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'
import {generarToken} from '../lib/tokens.js'
import {emailRegistro, emailResetearPassword} from '../lib/emails.js'

const formularioLogin = (req, res) => {
     res.render("auth/login", {pagina: "Inicia sesión"});
}
const formularioRegistro = (req,res) =>
{
    res.render("auth/registro", {pagina: "Registrate con nosotros :)"});
}

const registrarUsuario = async(req,res) =>
{
    console.log("Intentando registrar a un Usuario Nuevo con los datos del formulario:");
    /*console.log(req.body);*/
    const {nombreUsuario:name, emailUsuario: email, passwordUsuario:password} = req.body 


    // Validación de los datos del formulario previo a registro en la BD
    // Definir reglas de validacion
    await check('nombreUsuario').notEmpty().withMessage("El nombre de la persona no puede ser vacío").run(req);
    await check('emailUsuario').notEmpty().withMessage("El correo electrónico no puede ser vacío").isEmail().withMessage("El correo electrónico no tiene un formato adecuado").run(req)
    await check('passwordUsuario').notEmpty().withMessage("La contraseña parece estar vacía").isLength({ min: 8 , max:30}).withMessage("La longitud de la contraseña debe ser entre 8 y 30 caractéres").run(req);
    await check('confirmacionUsuario').equals(password).withMessage("Ambas contraseñas deben ser iguales").run(req);

    // aplicamos la reglas definidas
    let resultadoValidacion = validationResult(req);

    // Verificar si el usuario no esta previamente registrado en la bd
    const existeUsuario = await Usuario.findOne({where: {email}})
  

    if(existeUsuario)
    {  res.render("auth/registro", { 
            pagina: "Registrate con nosotros :) ", 
            errores: [{msg:` Ya existe un usuario asociado al correo: ${email}`}],
            usuario: { nombreUsuario: name,           
            }});
    }


    // Validar si hay errores en la recepción de datos , si no mandar a bd

    if(resultadoValidacion.isEmpty())
    {
        const data =
        {
            name, 
            email, 
            password,
            token: generarToken()
        }
        const usuario = await Usuario.create(data);

        //Enviar el correo electrónico
        emailRegistro({
            nombre: usuario.name,
            email: usuario.email,
            token: usuario.token
        })


        res.render("templates/mensaje",{
            title: "¡Bienvenid@ a BienesRaíces!",
            msg: `La cuenta asociada al correo: ${email}, se ha creado exitosamente, te pedimos confirmar tu a través del correo electrónico que te hemos enviado. `
        })

    }
    else 
        res.render("auth/registro", { 
            pagina: "Error al interar crear una cuenta.", 
            errores: resultadoValidacion.array(), 
            usuario: { nombreUsuario: name,
                emailUsuario: email
            }});
    
            
}

const paginaConfirmacion = async(req, res) =>
{
     const {token:tokenCuenta} = req.params
     console.log("Confirmando la cuenta asociada al token: ", tokenCuenta);
     
     //Confirmar si el token existe en la BD 
     const usuarioToken = await(Usuario.findOne({where:{token:tokenCuenta }}))
     console.log(usuarioToken);

     if(!usuarioToken)
     {
        res.render("templates/mensaje",{
            title: "Error al confirmar la cuenta",
            msg: `El código de verificación (no es válido), por favor intentalo de nuevo.`,
            buttonVisibility: false,
            buttonText: null,
            buttonURL: null});
     }

     else {
     // Actualizar los datos del usuario.
     usuarioToken.token=null;
     usuarioToken.confirmed=true;
     usuarioToken.save();
    
     res.render("templates/mensaje",{
            title: "Confirmación exitosa",
            msg: `La cuenta de:  ${usuarioToken.name}, asociada al correo electrónico: ${usuarioToken.email} se ha confirmado, ahora ya puedes ingresar a la plataforma.`,buttonVisibility: true,
            buttonText: "Ingresar a BienesRaices-MATRICULA!",
            buttonURL: "/auth/login"});
    }

}

const formularioRecuperacion = (req,res) =>
{
    res.render("auth/recuperarPassword", {pagina: "Te ayudamos a restaurar tu contraseña"});
}

const formularioActualizacionPassword = (req,res) =>
{
    res.render("auth/resetearPassword", {pagina: "Ingresa tu nueva contraseña"});
}



const resetearPassword = async(req, res) =>
{
    const {emailUsuario:usuarioSolicitante} = req.body
    console.log(`El usuario con correo: ${usuarioSolicitante} esta solicitando un reseteo de contraseña.`)

    const {emailUsuario: email} = req.body 

     // Validaciones del Frontend 
     await check('emailUsuario').notEmpty().withMessage("El correo electrónico no puede ser vacío").isEmail().withMessage("El correo electrónico no tiene un formato adecuado").run(req)
    
     let resultadoValidacion = validationResult(req);

     if(!resultadoValidacion.isEmpty())
     {
         res.render("auth/recuperarPassword", { 
            pagina: "Error, correo inválido", 
            errores: resultadoValidacion.array(), 
            usuario: { emailUsuario: email  }});
     }

    // Validación 1
    const usuario = await Usuario.findOne({where: { email: usuarioSolicitante}});
    // SELECT email FROM tb_users WHERE email =  usuarioSolicitante;   // SQL Injection
    if(!usuario)
    {
            res.render("templates/mensaje",{
            title: "Error, buscando la cuenta",
            msg: `No se ha encontrado ninguna cuenta asociada al correo: ${usuarioSolicitante}`,
            buttonVisibility: true,
            buttonText: "Intentalo de nuevo",
            buttonURL: "/auth/recuperarPassword"
            });
    
    }
    else
    {
        //Validacion 2
        if (!usuario.confirmed)         
        {
            res.render("templates/mensaje",{
            title: "Error, la cuenta no esta confirmada",
            msg: `La  cuenta asociada al correo: ${usuarioSolicitante}, no ha sido validad a través de la liga segura enviada al correo electrónico.`,
            buttonVisibility: true,
            buttonText: "Intentalo de nuevo",
            buttonURL: "/auth/recuperarPassword"
            });
        }

        else
        {
            // Actualizar el token
            usuario.token = generarToken();
            usuario.save();
            // Enviar el token por correo   
            emailResetearPassword({
                nombre: usuario.name,
                email: usuario.email,
                token: usuario.token
            })

            // Responder con una vista de correo enviada
            res.render("templates/mensaje",{
                title: "Correo para la Restauración de Contraseñas",
            msg: `Un paso más, te hemos enviado un correo electrónico con la liga segura para la restauración de tu contraseña.`,
            buttonVisibility: false});
        }
   
             
        }
}

export { formularioLogin, formularioRegistro, registrarUsuario, formularioRecuperacion, paginaConfirmacion, resetearPassword, formularioActualizacionPassword}