import jwt from 'jsonwebtoken'

const generarToken = () => Date.now().toString(32) + Math.random().toString(32).substring(2) + "MArh-26";

const generarJWT  = id => jwt.sign({
                    id,
                    nombre: 'Su nombre completo',
                    programaEducativo: 'DSM',
                    asignatura : 'Aplicaciones Web Orientadas a Servicios',
                    tecnologias: 'API REST, NodeJS, Express y Sequelize'
                }, process.env.JWT_SECRET, {expiresIn: '1d'});

export {generarToken, generarJWT}