import express from 'express'

// Creamos el ruteador
const router = express.Router();

// Definimos las rutas necesaria para las peticiones del usuario, son ejemplo de llamado


// Ejemplo de un ENDPOINT GET
router.get("/", (req, res) => {
    console.log("Bienvenid@ al Sistema de Bienes Raices")
    console.log("Proceso de una petición del tipo GET.")
    res.json({
        status: 200,
        message: "Solicitud recibida a través del método GET"
    })
})

// Ejemplo de un ENDPOINT POST
router.post("/", (req, res) => {
    console.log("Se ha recibido una petición del tipo POST.")
    res.json({
        status: 400,
        message: "Lo sentimos, no se aceptan peticiones POST."
    })
})


// Ejemplo de un ENDPOINT POST - Simular la creación de un nuevo usuario
router.post("/createUser", (req, res) => {
    console.log("Se ha solicitado crear un nuevo usuario.")
    console.log("Proceso de una petición del tipo POST.")
    const nuevoUsuario =
    {
        nombre: "Oliver Sanchez Arrioja",
        correo: "osanchezrrioja@gmail.com"
    }
    res.json({
        status: 200,
        message: `Se ha solicitado la creación de un usuario de nombre: ${nuevoUsuario.nombre} y correo: ${nuevoUsuario.correo}`
    })
})


// Ejemplo de un ENDPOINT PUT - Simular la actualización de los datos de un usuario creado
router.put("/updateUser", (req, res) => {
    console.log("Se ha solicitao la actualización de los datos del usuario, siendo PUT una actualización completa.")
    console.log("Proceso de una petición del tipo PUT.")
    const usuario =
    {
        nombre: "Oliver Sanchez Arrioja",
        correo: "osanchezrrioja@gmail.com"
    }

    const usuarioActualizado =
    {
        nombre: "Ana Victoria",
        correo: "ana@gmail.com"
    }
    res.json({
        status: 200,
        message: `Se ha solicitado la actualización completa de los datos del usuario de nombre: $
        {usuario.nombre} y correo: ${usuario.correo} a 
        ${usuarioActualizado.nombre} y correo: ${usuarioActualizado.correo}`
    })
})


// Ejemplo de un ENDPOINT PATCH - Simular la actualización una contraseña del usuario
router.patch("/updatePassword/:nuevoPassword", (req, res) => {
    console.log("Se ha solicitao la actualización de los datos de la contraseña, siendo PATCH una actualización parcial.")
    console.log("Proceso de una petición del tipo ENDPOINT PATCH.")
    const usuario =
    {
        nombre: "Oliver Sanchez Arrioja",
        correo: "osanchezrrioja@gmail.com",
        password: "abcde"
    }

    const {nuevoPassword} = req.params
    
    res.json({
        status: 200,
        message: `Se ha solicitado la actualización parcial de la contraseña del usuario nombre: 
        ${usuario.nombre} y correo: ${usuario.correo} del password: ${usuario.password} a ${nuevoPassword}`
    })
})


// Ejemplo de un ENDPOINT DELETE - Simular la eliminación de un usuario creado
router.delete("/deleteProperty/:id", (req, res) => {
    console.log("Procesando una petición del Tipo DELETE")
    const { id } = req.params;

    res.json({
        status: 200,
        message: `Se realizara una eliminación de la propiedad ${id}.`
    })
})

router.get("/login", (req, res) => {
    console.log("El usuario desea acceder al sistema")
    res.status(200).send(`<h1>Por favor introduce tus credenciales de acceso </h1>
    <form>
        <input type="text"></input><br>
        <input type="password"></input><br>
        <button>Enviar</button>
    </form> `);
})

router.get("/saludo/:nombre", (req, res) => {
    const { nombre } = req.params;
    console.log(`El usuario: ${nombre}`)
    res.status(200).send(`<p>Bienvenido <b>${nombre}</b></p> </h1>`)
})

export default router