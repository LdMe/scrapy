import express from 'express'; // framework para crear el servidor
import dotenv from 'dotenv'; // cargar variables de entorno
import router from './routes/router.js';// importar rutas

import connectDB from './config/mongo.js';


dotenv.config();// cargar variables de entorno
connectDB();
const app = express();// crear servidor 

app.set("views",'./src/views');// configurar directorio de plantillas
app.set('view engine', 'pug');// configurar motor de plantillas

app.use(express.static('public')); // configurar directorio de archivos estáticos
app.use(express.urlencoded({ extended: true }));// configurar body parser para recibir datos de formularios
app.use(express.json());// configurar body parser para recibir datos en formato json


app.use('/', router);// configurar rutas

app.listen(3000, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.APP_PORT}`);
});// iniciar servidor en el puerto indicado en las variables de entorno