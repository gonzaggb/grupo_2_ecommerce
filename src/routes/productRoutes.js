//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()
//requiero el controlador de main
const productController = require('../controllers/productController')
//requerir multer

//requerir express-validator
const { validateCreateForm } = require('../middleware/validateCreateForm')
const { validateEditForm } = require('../middleware/validateEditForm')
//authMiddleware
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
//multer
const upload = require('../middleware/productsMulter')





//Asigno a cada ruta la propiedad del controlador
router.get('/', authMiddleware, adminMiddleware, productController.list)
//View
router.get('/detail/:id', authMiddleware, productController.detail)

//Create
router.get('/add', authMiddleware, adminMiddleware, productController.formNew) //formulario de creacion de producto
router.post(
  '/add',
  upload.any(
    'main_image',
    'image_dimension',
    'data_sheet',
    'install_sheet',
    'image_slider1',
    'image_slider2',
    'image_slider3'
  ),
  validateCreateForm,
  productController.create
)
// a donde va el producto creado

//Update
router.get('/:id/edit', authMiddleware, adminMiddleware, productController.edit) //formulario de edicion de producto
router.put(
  '/:id/edit',
  upload.any(
    'main_image',
    'image_dimension',
    'data_sheet',
    'install_sheet',
    'image_slider1',
    'image_slider2',
    'image_slider3'
  ),
  validateEditForm,
  productController.update
)

//Delete
router.delete('/:id', authMiddleware, adminMiddleware, productController.delete)


module.exports = router
