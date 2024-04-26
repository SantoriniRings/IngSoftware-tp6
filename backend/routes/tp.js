const express = require('express');
const tp = express.Router();

tp.use(express.urlencoded({ extended: false }));

tp.get('/tipocarga', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }

        conn.query('SELECT * FROM tipocarga', (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al obtener los tipos de cargas' });
            }

            res.json(rows);
        });
    });
});

module.exports = tp;