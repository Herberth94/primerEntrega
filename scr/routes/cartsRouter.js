import express from "express";
import cartsController from "../controllers/carts.js";
export const routerCarts = express.Router()

routerCarts.post('/',cartsController.postCarts);
routerCarts.get('/:cid',cartsController.getCarts);
routerCarts.post('/:cid/product/:pid',cartsController.addByidProducts);