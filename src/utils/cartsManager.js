import fs from 'fs'
import { __dirname } from "./utils.js";
export class cartsManager {
    constructor(){
        this.carts = '';
        this.products = {};
        this.path = __dirname +'/carrito.json';
        if(fs.existsSync(this.path)){
            console.log("El archivo EXISTE!");
         }else{
            console.log("El archivo NO EXISTE!");
            fs.writeFile(this.path,'',(error)=>{
               if (error) throw error;
            })
        }
    }
   async getCartsByid (id){
    let readFile = await fs.promises.readFile(this.path,'utf-8');
        readFile = JSON.parse(readFile);
        const searchProduct = readFile.find((value)=>{
            if(value.id == parseInt(id)){
                return value
                }});
            if(searchProduct == undefined){return true}
            else{
               return searchProduct
            };
   }
   async postCarts(){
    const newData = {
        id:'',
        products:[]
    }
    console.log(2)
    const readFile = await fs.promises.readFile(this.path,'utf-8');
    if(readFile == ''){
        // Agrega id = 0 al Objeto creado
        newData.id = 0;
        // Agrega el nuevo producto al archivo text.json
        await fs.promises.appendFile(this.path,JSON.stringify([newData]))
        return true
       }
       else{
        console.log(4)
        // Transforma los datos JSON en un Objeto de JS
        let newArray =(JSON.parse(readFile));
        //console.log(newArray)
        let id = newArray.length;
        newData.id = id   
        console.log(newData)     
        newArray.push(newData);
        await fs.promises.writeFile(this.path,JSON.stringify(newArray));
        return true
                   
     }


    }
    async addByidproducts (cid,pid){
        const readFile = await fs.promises.readFile(this.path,'utf-8');
        const arrayData = JSON.parse(readFile)
        // Primero busco el id del carrito
        const searchCid = arrayData.find(value => value.id == cid);
        if(searchCid){
        // Verifico si en el campo products tiene algun dato
        if(searchCid.products.length == 0 ){ 
        // Agrego un valor con objeto al campo products
            this.products = { product : pid, quantity :1}
            searchCid.products.push(this.products)
        }
        else{
        // En caso que el campo products tenga datos se procede a busca el id de los productos
            const searchByProduct = searchCid.products.find(product => product.product ==pid)
        // Si encuentra un producto existente se incrementa quantity
            if(searchByProduct){searchByProduct.quantity++}
        // En caso que no encuentre el id del producto se procede agregar informacion inicial
            else{searchCid.products.push( { product : pid, quantity :1})}
        }

        console.log(arrayData)
        await fs.promises.writeFile(this.path, JSON.stringify(arrayData));
        return true
    }
    else {
        return false
    }
   }
   


}