const express = require('express');
const router = express.Router();
const productsApiController = require('../../controllers/API/productsApiController')

//ruta para traer todos los usuarios
router.get('/', productsApiController.list)
router.get('/last',productsApiController.lastProduct)
router.get('/productsByCategory/:category', productsApiController.filterByCategory)
router.get('/qty', productsApiController.qty)
router.get('/:byName', productsApiController.findByName) //FEDE 
router.get('/:id', productsApiController.detail)



module.exports = router