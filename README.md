Indicaciones:
**************************************************************************************************************************
GET- http://localhost:8080/api/products  : Mostrara todos los productos almacenados.
GET- http://localhost:8080/api/products?limit=5 : Mostrara el numero de productos deseado el numero "5" se pude modificar.
GET- http://localhost:8080/api/products/:pid : Mostrara un producto especifico por su Id.
POST- http://localhost:8080/api/products  : Agrera un nuevo producto, ejemplo objeto que se envia:
{
        "title": "producto prueba_20",
        "description": "Este es un producto prueba",
        "price": 200,
        "thumbnail": "sin imagen",
        "code": "abc123",
	    "status" : true,
	    "category":"clothes",
        "stock": 25
}

DELETE- http://localhost:8080/api/products/:pid  : Eliminar un producto especifico por su Id.
UPDATE- http://localhost:8080/api/products/:pid  : Modificar un campo de un producto por su Id y data( Nota: seguira la estructura siguiente del objeto-body)
{
	"updateField":"title",
	"newValue":"Hola mundo"
}

**************************************************************************************************************************