import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import db from '../firebase/appConfig'

export default function ListProducts() {
    //declaramos un estado para la lista de productos
    const [products, setProducts] = useState([]) 
     // Verificar si el usuario está autenticado
    //montando la informacion de los productos que hay en firebase
    useEffect(() => {
        //Funcion que nos permite visualizar la info de la bd en tiempo real
        onSnapshot(
            //obtenemos la conexion de la base de datos y el nombre de la coleccion
            collection(db, "products"),
            (snapshot) => {
                //objeto de firebase
                //console.log(snapshot);
                //testeando el primer documento de la coleccion
                console.log(snapshot.docs[0].data());
                
                /** mapeando / iterando los documentos de la coleccion */
                const array_products = snapshot.docs.map((doc) => {
                    //copiamos la data de cada documento de la coleccion productos y la mandamos al array_products
                    return {...doc.data(), id: doc.id}
                })
                //testear 
                console.log(array_products);
                
                //actualizamos el estado con el arreglo de productos
                setProducts(array_products)
            }
        )
    }, [])

    //funcion para eliminar un producto
    const deleteProduct = (id) => {
        console.log(id);
        try{
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                    //eliminar el documento
                    deleteDoc(doc(db, "products", id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
        }catch(error){
            console.error("Error al eliminar un producto",error)
        }
        
    }

    return (
        <div className="container my-4">
        <h2 className="mb-4">Lista de Productos</h2>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} >
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td className='d-flex justify-content-center'> 
                    <Link to={`/editar/${product.id}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                    <button 
                      onClick={() => deleteProduct(product.id)} 
                      className="btn btn-danger btn-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No hay productos por el momento</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
}
