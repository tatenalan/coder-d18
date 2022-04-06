const express = require('express');
const { routerProduct } = require('./routes/product.route');
const { mongoConnect } = require('./config.js')
// llamo a dotenv para usar process.env
require('dotenv').config()

const app = express()

// Mongo Atlas
mongoConnect();

// Server
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {console.log(`Server running ${PORT} ...`)})
server.on('error', e => console.error(`SERVER ERROR: `, e))

// Rutas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// configura nuestro directorio estático
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.send('Inicio'))
app.use('/api/products', routerProduct)