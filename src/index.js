const { json } = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () =>  console.log(`Starting server: "${port} port"`))
const {join} = require("path");
const statics = express.static(join(__dirname, "../public"))
app.use(statics)

app.get("/", (req, res) => res.sendFile(join(__dirname, "views/index.html")))

app.use(express.json()); 

const products = [
    {
        id: 1,
        precio: 100,
        title: "Producto 1",
        image: "img/product.jpg",
        stock: 5
    },
    {
        id: 2,
        precio: 200,
        title: "Producto 2",
        image: "img/product.jpg",
        stock: 5
    },
    {
        id: 3,
        precio: 300,
        title: "Producto 3",
        image: "img/product.jpg",
        stock: 5
    },
    {
        id: 4,
        precio: 400,
        title: "Producto 4",
        image: "https://m.media-amazon.com/images/I/61eIVXuxyAS._AC_SY355_.jpg",
        stock: 5
    },
    {
        id: 5,
        precio: 500,
        title: "Producto 5",
        image: "https://m.media-amazon.com/images/I/61eIVXuxyAS._AC_SY355_.jpg",
        stock: 5
    },
    {
        id: 6,
        precio: 600,
        title: "Producto 6",
        image: "https://m.media-amazon.com/images/I/61eIVXuxyAS._AC_SY355_.jpg",
        stock: 5
    }
];

const detalleCompras = [];

app.get('/api/products', (req, res) => res.send(products))

app.post("/api/pagar", (req, res) => {
    const compra = req.body;
    compra.forEach(id => {
        const producto = products.find(x => x.id === id);
        if (producto.stock > 0){
            producto.stock--;
        } else {
            throw("-----Sin Stock-----")
        }
        
    });
    //console.log(products);
    res.send(products);
})

app.post("/api/detalle", (req, res) => {
    const detalle = req.body; 
    detalleCompras.push(detalle);
    console.log(detalle);
    res.send(products);
})
