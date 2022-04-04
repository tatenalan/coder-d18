const mongoose = require('mongoose')
const { Schema } = mongoose

// Usamos un objeto Schema para definir una lista de propiedades del documento/collection.
// Tambien usamos un modelo constructor para poder crear instancias de los documentos/collections.
const Product = mongoose.model('Product', new Schema({name:String, price:Number, thumbnail:String}))


const getProducts = async() => await Product.find();
const insertProduct = async (product) => await Product.create(product);

module.exports = { getProducts, insertProduct }