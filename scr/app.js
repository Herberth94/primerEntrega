//@ts-check
import  express, { Router } from "express";
import morgan from "morgan";
import { routerProducts } from "./routes/productsRouter.js";
import { routerCarts } from "./routes/cartsRouter.js";
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use('/api/products',routerProducts);
app.use('/api/carts',routerCarts);

app.listen(PORT, () => {
     console.log(`listening on port ${PORT}`);
 });