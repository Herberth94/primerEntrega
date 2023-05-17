import fs from 'fs'
import { __dirname } from './utils.js';
export class ProductManager {
    constructor(){
        this.product =[]
        this.path = __dirname +'/text.json'
        if(fs.existsSync(this.path)){
            console.log("El archivo EXISTE!");
         }else{
            console.log("El archivo NO EXISTE!");
            fs.writeFile(this.path,'[]',(error)=>{
               if (error) throw error;
            })
        }
    }
    // Verificación si los campos estan debidamente ingresados o si el usuario omitio algo retorna un false si todo esta ok
     #verificationProducts(newProduct){
        const verificationNewProduct = Object.values(newProduct).some((values)=>values === null || values === undefined || values === '');
        return(verificationNewProduct);
    }
    // Método que muesta en consola todos los productos agregados al archivo JSON
    async getProducts(){
        const readFile = await fs.promises.readFile(this.path,'utf-8')
        if(readFile == "" || readFile == '[]'){
        //console.log("vacio")
            //console.log(this.product)
            return this.product
        }
       else{
        this.product= JSON.parse(readFile);
        return this.product
       }
    };
    // Método que agrega un producto al archivo text.json
    async addProduct(
        title,
        description,
        price,
        thumbnail,
        status,
        category,
        code,

        stock
        )
        {
       let newProduct ={
        title:title,
        description:description,
        price:price,
        thumbnail: thumbnail,
        status:status,
        category:category,
        code: code,
        stock:stock,
       }
       // Verifica si el producto tiene todos sus campos llenos
       const verification = this.#verificationProducts(newProduct);
       // Lee el archivo text.json
       const readFile = await fs.promises.readFile(this.path,'utf-8');
       //console.log(readFile)
       if(!verification){
           if(readFile == ""){
            // Agrega id = 0 al Objeto creado
            newProduct = {...newProduct,id:0}
            // Agrega el nuevo producto al archivo text.json
            await fs.promises.appendFile(this.path,JSON.stringify([newProduct]))
            return true
           
           }
           else{
              // Transforma los datos JSON en un Objeto de JS
              let newArray =(JSON.parse(readFile));
              let id = newArray.length;
              newProduct = {...newProduct,id:id};
              newArray.push(newProduct);
              await fs.promises.writeFile(this.path,JSON.stringify(newArray));
              return true
                         
           }

       }
       else{
        return false        
       }
    }
    // Método que busca el producto en base al ID del archivo text.json
   async getProductById (id){
        let readFile = await fs.promises.readFile(this.path,'utf-8');
        readFile = JSON.parse(readFile);
        const searchProduct = readFile.find((value)=>{
            if(value.id == id){
                //console.log(value);
                return value
                }});
            if(searchProduct == undefined){return true}
            else{
                //console.log(searchProduct);
                return searchProduct
            };
   }
   // Actulización de un producto atravez de su Id y ademas se debe ingresar el campo que desea actulizar y su valor de la misma
   async updateProduct (id,updateField,newValue){
    try {
        const readFile = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(readFile);
        const index = products.findIndex(p => p.id === parseInt(id));
        
        if (index !== -1) {
          products[index][updateField] = newValue;
          await fs.promises.writeFile(this.path, JSON.stringify(products));
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.error(err);
        return false;
      }
    

   }  
   async deleteProduct(id){
    let deleteArray = []
    let readFile = await fs.promises.readFile(this.path,'utf-8');
        readFile = JSON.parse(readFile);
        console.log(typeof(id))
    const searchProduct = readFile.find( (value)=>{
        if(value.id == id){

            const newArray = readFile.filter(element => element.id != id );
            //console.log(newArray)
            deleteArray = newArray
            return true;
        }
    });
    
    if(searchProduct == undefined){return false}
    else{
        //console.log(deleteArray);
        await fs.promises.writeFile(this.path,JSON.stringify(deleteArray));
        return true
         
    }
   }

}
