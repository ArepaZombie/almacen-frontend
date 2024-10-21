class Producto {
    constructor() {
      // TODO inicializar firestore y settings
      this.db = firebase.firestore();
    }
  
    todosProdutos() {
      console.log("Cargando productos")
      this.db.collection(`productos`).onSnapshot( querySnapshot => {    
          $('#tablaProductos').empty()     
          if (querySnapshot.empty) {
              console.log("vacio")
              $('#tablaProductos').append(this.templateProductoVacio())
          }else {
              $('#tablaProductos').append(this.templateHeader())
               querySnapshot.forEach( Producto => {
                console.log(Producto.id)
                  let postHtml =  this.templateProducto(
                      Producto.id,
                      Producto.data().nombre,
                      Producto.data().tipo,
                      Producto.data().stock
                  )
                  $('#tablaProductos').append(postHtml)
               })
               $('#tablaProductos').addClass("w-100 table rounded border-primary table-hover")
              }
            })
  }

  templateProducto(id, nombre, tipo, stock){
    return `
    <tr>
        <td>${nombre}</td>
        <td>${tipo}</td>
        <td>${stock}</td>
        <td>
            <button onclick="preEditar('${id}')" id="btnEditar" class="btn btn-outline-warning">✏️</button>
            <button onclick="preBorrado('${id}')" id="btnBorrar" class="btn btn-outline-danger">🗑️</button>
        </td>
    </tr>
    `
  }

  templateHeader(){
    return `
    <tr class="text-center">
      <th class="thnombre">Nombre</th>
      <th class="thtipo">Tipo</th>
      <th class="thcantidad">Stock</th>
      <th class="thacciones">Acciones</th>
    </tr>
    `
  }
    crearProducto(uid, emailUser, nombre, tipo, stock) {
      return this.db.collection('productos').add({
        uid: uid,
        autor: emailUser,
        nombre: nombre,
        tipo: tipo,
        stock: stock,
        fecha: firebase.firestore.FieldValue.serverTimestamp()
      }).then(refDoc => {
        console.log(`Id del producto => ${refDoc.id}`);
      }).catch(error => {
        console.error(`Error creando el producto => ${error}`);
      });
    }

    actualizarProducto(idProducto, nombre, tipo, stock) {
        return this.db.collection('productos').doc(idProducto).update({
          nombre: nombre,
          tipo: tipo,
          stock: stock,
          fechaActualizacion: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
          console.log(`Producto actualizado`);
        }).catch(error => {
          console.error(`Error actualizando el producto => ${error}`);
        });
    }

    borrarProducto(idProducto) {
      return this.db.collection('productos').doc(idProducto).delete()
        .then(() => {
          console.log(`Producto borrado`);
        })
        .catch(error => {
          console.error(`Error borrando el producto => ${error}`);
        });
    }
}
  
