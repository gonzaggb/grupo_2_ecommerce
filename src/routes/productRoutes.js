//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()

//requiero el controlador de main
const productController = require('../controllers/productController')

//Asigno a cada ruta la propiedad del controlador
router.get('/', productController.detail);
router.get('/add', productController.add);
router.post('/add', productController.create)
router.get('/list', productController.list)
router.get('/edit', productController.edit)
/* router.put('/edit', productController.edit) */
module.exports = router
