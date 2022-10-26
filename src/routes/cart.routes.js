const {Router} = require('express')
const router = Router()
const controller = require('../controller/products.controller');
const api = require('../api/products.api');

//ruta render
router.get("/", controller.show)

//rutas apis
router.get('/api/products', api.products)

router.post("/api/pagar", api.pay)

router.post("/api/detalle", api.detail)

module.exports = router