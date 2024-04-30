// acá cada uno tiene que poner sus variables de entorno para la bd (MySQLWorkbench)
require('dotenv').config();

const express = require('express');
const mysql2 = require('mysql2');
const myconn = require('express-myconnection');
const cors = require('cors');

const tp6 = require('./routes/tp');

const app = express();
app.set('port', process.env.PORT || 3001);
const dbOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from(process.env.DB_PASSWORD)
  }
};

// middlewares
app.use(myconn(mysql2, dbOptions, 'single'));
app.use(express.json());
app.use(cors());

// rutas
app.use('/tp', tp6);


// servidor corriendo
app.listen(app.get('port'), () => {
  console.log('Servidor está corriendo en puerto', app.get('port'));
});
