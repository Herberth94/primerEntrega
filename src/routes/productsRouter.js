//@ts-check
import express from "express"
import productsController from '../controllers/products.js'
export const routerProducts = express.Router();

// Ruta para ver todos los productos al igual se puede enviar un limite de en productos
routerProducts.get('/',productsController.allProducts);
// Ruta para ver un producto en especifico
routerProducts.get('/:pid',productsController.pidProducts);
// Ruta para agregar nuevos productos
routerProducts.post('/',productsController.addProducts);
// Ruta para eliminar un producto por su ID
routerProducts.delete('/:pid',productsController.deleteProducts);
// Ruta para actualizar un campo y su valor por medio del ID
routerProducts.put('/:pid',productsController.updateProducts);