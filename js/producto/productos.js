class Producto {
    constructor () {
        // TODO inicializar firestore y settings
  
        this.db = firebase.firestore();
    }


    crearProducto(uid, emailUser, nombre, stock, tipo){
        return this.db.collection('productos').add({
            uid: uid,
            autor: emailUser,
            nombre: nombre,
            stock: stock,
            tipo: tipo,
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        }).then ( refdoc => {

            console.log(`Id del producto => ${refDoc.id}`)
        }).catch( error => {
    
            console.error(`Error creando el  producto => ${error}`)
        })
    }


}