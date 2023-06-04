//@ts-check
import  {cartsManager}  from "../utils/cartsManager.js";
const carts = new cartsManager();
const cartsController ={};

cartsController.postCarts = async (req,res)=>{
    try {
        const newCarts = await carts.postCarts();
        if(newCarts){
            res.status(200).send({status:'success'});
        }
        
    } catch (error) {
        res.status(404).send(error);
    }
}

cartsController.getCarts = async(req,res)=>{
    try {
        const {cid}= req.params
        let result = await carts.getCartsByid(cid);
        console.log(result)
        if(result == true){res.status(404).send({status:'error',data: 'NOt found'})}
        else{
            res.status(200).send({status:'success', data:result});
        }
    } catch (error) {
        res.status(404).send(error);
    }
}

cartsController.addByidProducts = async (req,res)=> {
    const {cid , pid } = req.params
    const result = await carts.addByidproducts(parseInt(cid),parseInt(pid));
    if(result){ res.status(200).send({status:'success'});}
    else{res.status(404).send({status:'Error', data:'Not found'})}
}

export default cartsController
