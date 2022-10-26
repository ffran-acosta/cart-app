const {all} = require('../models/products.model');
const detalleCompras = [];

const api = {
    products: async (req, res) => {
        let products = await all()
        return res.status(200).json(products)
    },
    pay: async (req, res) => {
        let products = await all()
        let compra = req.body;
        compra.forEach(id => {
            const producto = products.find(x => x.id === id);
            if (producto.stock > 0){
                producto.stock--;
            } else {
                throw("-----Sin Stock-----")
            }
            
        });
        // console.log(products);
        res.send(products);
    },
    detail: async (req, res) => {
        let products = await all()
        const detalle = req.body; 
        detalleCompras.push(detalle);
        console.log(detalle);
        res.send(products);
    }
}

module.exports = api