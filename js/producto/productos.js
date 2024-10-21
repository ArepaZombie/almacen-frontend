class Producto {
    constructor() {
      // TODO inicializar firestore y settings
      this.db = firebase.firestore();
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
  
