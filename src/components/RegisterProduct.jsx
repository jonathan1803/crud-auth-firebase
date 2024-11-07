import { addDoc, collection } from 'firebase/firestore';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import db from '../firebase/appConfig';

export default function RegisterProduct() {
    const { register, handleSubmit, watch, formState: {errors} } = useForm()
    /**
     * register = hace referencia a lo que capturo en la entrada de dato
     * watch = permite observar alguna entrada de dato (valor)
     * handleSubmit = es la accion de lo que voy hacer con la informacion
     */

    //creando una constante para redirigir a una ruta
    const navigate = useNavigate()
   // Verificar si el usuario está autenticado
   const user = sessionStorage.getItem('user_firebase');
    console.log(watch('name'));
    //metodo para guardar un producto
    const saveProduct = async (data) => {
        console.log("Se ha guardado");
        console.log(data);
        
        //conectarnos a la bd y guardamos un documento
        try{
            await addDoc(collection(db, "products"), {
                name: data.name,
                description: data.description
            })
        }catch(error){
            console.error("Error al registrar el producto", error)
        }
        //redireccionamos a lista de productos
        navigate("/productos")
    }
    
    return (
      <div className="d-flex justify-content-center">
          <div className="card p-4" style={{ width: "400px" }}>
              <h2 className="text-center mb-4">Registro de Productos</h2>
              {/* Si no hay usuario autenticado, no se puede guardar el producto */}
              {user ? (
                  <form onSubmit={handleSubmit(saveProduct)}>
                      <div className="mb-3">
                          <label htmlFor="name" className="form-label">Ingresar Producto</label>
                          <input
                              type="text"
                              id="name"
                              className="form-control"
                              {...register("name")}
                              placeholder="Nombre del producto"
                          />
                      </div>

                      <div className="mb-3">
                          <label htmlFor="description" className="form-label">Descripción</label>
                          <input
                              type="text"
                              id="description"
                              className="form-control"
                              {...register("description")}
                              placeholder="Descripción del producto"
                          />
                      </div>

                      <div className="text-center">
                          <button type="submit" className="btn btn-primary w-100">Guardar Producto</button>
                      </div>
                  </form>
              ) : (
                  <div className="text-center">
                      <p>Debes iniciar sesión para guardar productos.</p>
                      <button 
                          className="btn btn-secondary w-100"
                          disabled
                      >
                          Guardar Producto
                      </button>
                  </div>
              )}
          </div>
      </div>
  );
}
