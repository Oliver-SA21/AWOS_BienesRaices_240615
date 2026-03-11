import express from 'express'
import {formularioLogin, formularioRecuperacion, formularioRegistro, registrarUsuario,
    paginaConfirmacion
} from '../controllers/usuarioController.js'

const router = express.Router();

// Definir los ENDPOINTS
// GET
router.get("/login", formularioLogin)
router.get("/registro", formularioRegistro)
router.get("/recuperarPassword", formularioRecuperacion)
router.get("/confirma/:token", paginaConfirmacion)


//POST
router.post("/registro", registrarUsuario)
router.post("/createUser", (req, res) =>
    {
        console.log("Se esta procesando una petición del tipo POST")
        const nuevoUsuario = {
            nombre:"Marco A. Ramírez",
            correo:"marco@gmail.com"
        }

        res.json({
            status:200, 
            message: `Se ha solicitado la creación de un nuevo usuario con nombre: ${nuevoUsuario.nombre} y correo: ${nuevoUsuario.correo}`
        })
    })
    
//PUT - Actualización Completa
router.put("/actualizarOferta/",(req, res)=>{
    console.log("Se esta procesando una petición del tipo PUT");
    const mejorOfertaCompra =
    {
        clienteID: 5158,
        propiedad: 1305,
        montoOfertado: "$125,300.00"
    }
    
    const nuevaOferta = 
    {
        clienteID: 1578,
        propiedad: 1305,
        montoOfertado: "$130,000.00"
    }

    res.json({
        status:200, 
        message: `Se ha actualizado la mejor oferta, de un valor de ${mejorOfertaCompra.montoOfertado} a ${nuevaOferta.montoOfertado} por el cliente: ${mejorOfertaCompra.clienteID}`
    })
})

//PATCH  - Actualización Parcial
router.patch("/actualizarPassword/:nuevoPassword", (req, res)=>
{
    console.log("Se esta procesando una petición del tipo PATCH");
    const usuario = {
        nombre: "Damián Romero",
        correo: "d.romero@gmail.com", 
        password: "123456789"        
    }

    const {nuevoPassword} = req.params;
    res.json({
        status:200,
        message: `La contraseña: ${usuario.password} ha sido actualizada a: ${nuevoPassword}`
    })
})

router.delete("/borrarPropiedad/:id", (req, res)=>{
    console.log("Se esta procesando una petición del tipo DELETE");
    const {id} = req.params;
    res.json({
        status:200, 
        message: `Se ha eliminado la propiedad con id : ${id}`
    })
})

export default router
