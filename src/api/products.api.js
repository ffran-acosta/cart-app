const {all, write} = require('../models/products.model');
const detalleCompras = [];

const api = {
    products:  (req, res) => {
        let products = all()
        return res.json(products)
    },
    pay: (req, res) => {
        let products = all()
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
    detail: (req, res) => {
        let products = all()
        const detalle = req.body; 
        detalleCompras.push(detalle);
        console.log(detalle);
        // console.log(detalleCompras);
        res.send(products);
    },
    // save: async (req, res) => {
    //     let products = await all()
    //     let update = products.map(product => {
    //         if (product.sku == req.body.id){
    //             product.stock =- req.body.stock
    //         }
    //         return product
    //     })
    //     write(update);
    // }
}

module.exports = api