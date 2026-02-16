import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";

//Instanciamos el Servidor que alojara la WebApp
const app = express();

//Importamos sus rutas (ruteo)
app.get("/", usuarioRoutes);
app.use("/", usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`El Servidor está iniciado en el puerto ${PORT}`)
})