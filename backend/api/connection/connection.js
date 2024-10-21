import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const connection = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT || 3306,
  }
);

async function authenticateDB() {
  try {
    await connection.authenticate();
    console.log("Conexión exitosa a la base de datos con Sequelize");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
}

authenticateDB();

export default connection;
