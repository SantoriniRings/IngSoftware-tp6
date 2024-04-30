const express = require('express');
const tp = express.Router();
const nodemailer = require('nodemailer');

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

tp.get('/usuarios', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }

        conn.query('SELECT * FROM usuarios', (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al obtener los usuarios' });
            }

            res.json(rows);
        });
    });
});

tp.post('/pedido', (req, res) => {
    const {
      tipo_carga,
      localidadRetiro,
      provinciaRetiro,
      calleRetiro,
      numRetiro,
      referenciaRetiro,
      fechaRetiro,
      localidadEntrega,
      provinciaEntrega,
      calleEntrega,
      numEntrega,
      referenciaEntrega,
      fechaEntrega,
      imagen,
      imagen2,
      id_usuario
    } = req.body;
  
    req.getConnection((err, conn) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
      }
  
      const query = `
        INSERT INTO pedidos (tipo_carga, localidadRetiro, provinciaRetiro, calleRetiro, numRetiro, referenciaRetiro, fechaRetiro, localidadEntrega, provinciaEntrega, calleEntrega, numEntrega, referenciaEntrega, fechaEntrega, imagen, imagen2, id_usuario)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        tipo_carga,
        localidadRetiro,
        provinciaRetiro,
        calleRetiro,
        numRetiro,
        referenciaRetiro,
        fechaRetiro,
        localidadEntrega,
        provinciaEntrega,
        calleEntrega,
        numEntrega,
        referenciaEntrega,
        fechaEntrega,
        imagen,
        imagen2,
        id_usuario
      ];
  
      conn.query(query, values, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error al insertar el pedido' });
        }
  
        res.status(201).json({ message: 'Pedido insertado correctamente' });
      });
    });
});

tp.get('/pedidos_transportista', (req, res) => {
    const id_usuario = req.query.id_usuario;

    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }

        conn.query('SELECT localidadRetiro FROM usuarios WHERE id = ?', id_usuario, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al obtener la localidad de retiro del transportista' });
            }

            const localidadRetiroTransportista = rows[0].localidadRetiro;

            conn.query('SELECT * FROM pedidos WHERE localidadRetiro = ?', localidadRetiroTransportista, (err, rows) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Error al obtener los pedidos del transportista' });
                }

                res.json(rows);
            });
        });
    });
});

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'patobonetto@gmail.com',
		pass: 'jyyz bmho paxx ywcr',
	},
});

tp.post('/api/enviarEmail', (request, response) => {
	const email = request.body;

	console.log('Destinatario: ' + email.destinatario);
	const mailOptions = {
		from: 'info@tangoapp.com',
		to: email.destinatario,
		subject: 'Se ha creado una solicitud de envío en tu zona',
		text: `Se ha creado una solicitud de envío de ${email.tipoCarga} `,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});

	response.json(email);
});

module.exports = tp;