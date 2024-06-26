const ProductModel = require ('../models/Product.js')

async function insertarProducto ( product ) {
    return await ProductModel.create(product)
}

async function obtenerProductos() {
    return await ProductModel.find();
}

async function obtenerUnProductoPorId( idProducto ) {
    return await ProductModel.findOne({ _id: idProducto });
}

async function eliminarUnProductoPorId( _id ) {
    return await ProductModel.findOneAndDelete({ _id });
}

async function actualizarUnProductoCompleto( _id, dataActualizada ) {
    return await ProductModel.findOneAndUpdate(
        { _id },           // Objeto de consulta
        dataActualizada,   // Data que se va a actualizar (Objeto que tiene el tipo 'ProductModel')
        { new: true }
    );
}



module.exports = {
    insertarProducto,
    obtenerProductos,
    obtenerUnProductoPorId,
    eliminarUnProductoPorId,
    actualizarUnProductoCompleto
}