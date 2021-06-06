//Requiero el modelo product para poder usar todos sus metodos
const product = require('../models/product')

const controller = {
  list: (req, res) => {
    let products = product.findAll()
    return res.render('products/product-list.ejs', { products: products })
  },
  detail: (req, res) => {
    let id = req.params.id
    let productDetail = product.findByPk(id)
    res.render('products/product-detail.ejs', { productDetail })
  },
  formNew: (req, res) => {
    res.render('products/product-create.ejs')
  },
  create: (req, res) => {
    let productUpdate = req.body
    product.create(productUpdate)
    res.redirect('/product/list')
  },
  edit: (req, res) => {
    let id = req.params.id
    let productDetail = product.findByPk(id)
    res.render('products/product-edit.ejs', { productDetail })
  },
  update: (req, res) => {},

  delete: (req, res) => {
    //guardo la variable del id del articulo a borrar
    let id = req.params.id

    //llamo al modelo para que borre al articulo por su id
    product.delete(id)

    //retorno la lista de productos actualizada
    res.redirect('/product/list')
  },
}

module.exports = controller
