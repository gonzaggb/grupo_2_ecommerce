const fs = require('fs')
const path = require('path')

module.exports = {
  filename: path.resolve(__dirname, '../data/product.json'),

  readFile() {
    // Leer nuestra informacion
    const productPath = this.filename
    const productosJson = fs.readFileSync(productPath, 'utf-8')
    // Parsear la informacion
    const products = JSON.parse(productosJson)
    //Ordeno los elementos en cada una de las propiedades -
    products.forEach((element) => {
      for (const prop in element) {
        Array.isArray(element[prop]) ? element[prop].sort() : ''
      }
    })

    return products
  },

  writeFile(newData) {
    // Pasar la data a json
    const dataJson = JSON.stringify(newData, null, 2)
    // Escribir el archivo
    fs.writeFileSync(this.filename, dataJson)
  },

  generateId() {
    const product = this.readFile()
    const lastProduct = product.pop()

    return lastProduct.id + 1
  },

  findAll() {
    return this.readFile()
  },

  findByPk(id) {
    const products = this.readFile()
    // Filtrar por el ID
    const productFound = products.find((product) => product.id == id)
    // Devolvemos el producto
    return productFound
  },

  create(product, files) {
    product.id = this.generateId()
    console.log(files)
    //Dependiendo del tipo de archivo donde se guarda
    product.image_slider = []
    for (let i = 0; i < files.length; i++) {
      switch (files[i].fieldname) {
        case 'main_image':
          product.main_image = '/img/' + files[i].filename
          break
        case 'image_slider_1':
          product.image_slider_1 = '/img/' + files[i].filename
          product.image_slider.push(product.image_slider_1)
          break
        case 'image_slider_2':
          product.image_slider_2 = '/img/' + files[i].filename
          product.image_slider.push(product.image_slider_2)

          break
        case 'image_slider_3':
          product.image_slider_3 = '/img/' + files[i].filename
          product.image_slider.push(product.image_slider_3)

          break
        case 'image_dimension':
          product.image_dimension = '/img/' + files[i].filename
          break
        case 'data_sheet':
          product.data_sheet = '/pdf/' + files[i].filename
          break
        case 'install_sheet':
          product.install_sheet = '/pdf/' + files[i].filename
          break
        default:
      }
    }
    console.log(product.image_dimension)
    // Leer el archivo
    const products = this.readFile()

    // Agregar nuestro producto al array de products
    /*
    product.material == '' ? (product.material = []) : ''
    product.optic == undefined ? (product.optic = []) : ''
    product.power == '' ? (product.power = []) : ''
    product.cct == undefined ? (product.cct = []) : ''
    product.dim == undefined ? (product.dim = []) : ''
    product.image_slider == '' ? (product.image_slider = []) : ''*/

    //Incluimos el producto nuevo al array products
    const productsUpdated = [...products, product]

    // Volver a escribir el archivo con el nuevo array de productos
    this.writeFile(productsUpdated)

    return product
  },

  delete(id) {
    const products = this.readFile() //traer el array de productos
    const newProducts = products.filter((idProduct) => idProduct.id != id) //busca el producto a borrar
    const productToDelete = this.findByPk(id)
    this.writeFile(newProducts) //devuelve el array de productos sin el elemento borrado
    /*ELIMINO TODAS LOS ARCHIVOS ASOCIADOS*/
    const resourcesPath = path.join(__dirname, '../../public')
    fs.unlinkSync(path.join(resourcesPath, productToDelete.main_image)) // borra main_image
    for (i = 0; i < productToDelete.image_slider.length; i++) {
      fs.unlinkSync(path.join(resourcesPath, productToDelete.image_slider[i]))
    } // borra image slider
    fs.unlinkSync(path.join(resourcesPath, productToDelete.data_sheet)) // borra data sheet
    fs.unlinkSync(path.join(resourcesPath, productToDelete.install_sheet)) // borra install sheet
  },
  update(body, id, files) {
    const products = this.readFile()
    const productEdit = products.map((product) => {
      if (product.id == id) {
        product = {
          id: product.id,
          ...body,
        }
      }
      return product
    })
    this.writeFile(productEdit)
  },

  filterByCategory(categoryName) {
    let products = this.findAll()

    return products.filter((e) => e.category == categoryName)
  },
}
