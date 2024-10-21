import express from 'express';
import cors from 'cors';
import userRoutes from './api/routes/UserRoutes.js';
import connection from "./api/connection/connection.js";

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use(userRoutes);

if (process.env.NODE_ENV === "development") {
    await connection.sync();
}

const puerto = process.env.PUERTO || 3000;

app.listen(puerto, function(){
    console.log("Server ok en puerto: " + puerto)
});