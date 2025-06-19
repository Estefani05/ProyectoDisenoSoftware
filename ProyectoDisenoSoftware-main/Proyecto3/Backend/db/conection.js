const sql = require('mssql');
require('dotenv').config();

// Validar variables de entorno
const requiredEnvVars = ['DB_USER', 'DB_PASSWORD', 'DB_SERVER', 'DB_DATABASE', 'DB_PORT'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Falta la variable de entorno requerida: ${envVar}`);
  }
}

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  pool: {
    max: 10,
    min: 1,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Conectado a SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Error de conexión a SQL Server:', err);
    process.exit(1);
  });

// Función de health check
async function testConnection() {
  try {
    const pool = await poolPromise;
    await pool.request().query('SELECT 1');
    console.log('Conexión a SQL Server verificada.');
  } catch (err) {
    console.error('Error al verificar la conexión:', err);
  }
}
testConnection();

module.exports = {
  sql,
  poolPromise,
};