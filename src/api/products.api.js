const {all, write} = require('../models/products.model')
const detalleCompras = []

const api = {
    products:  (req, res) => {
        let products = all()
        return res.json(products)
    },

    pay: (req, res) => {
        let products = all()
        let compra = req.body
        compra.forEach(id => {
            const producto = products.find(x => x.id === id)
            if (producto.stock > 0) {
                producto.stock--;
            }
            return producto
        })
        write(products)
        return res.send(products)
    },

    detail: (req, res) => {
        let products = all()
        const detalle = req.body
        detalleCompras.push(detalle)
        res.send(products)
    }
}

module.exports = api