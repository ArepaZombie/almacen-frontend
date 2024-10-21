$(() => {

  $('#tablaProductos').ready(() => {
    console.log('controller')
    const producto = new Producto();
    producto.todosProdutos();
  })

  // botón para crear un nuevo producto
  $('#btnRegistrarProducto').click((event) => {
    event.preventDefault(); // Prevenir que el formulario se envíe de forma tradicional
    
    const producto = new Producto();
    const user = firebase.auth().currentUser;
    if (user == null) {
      alert(`Para crear el producto debes estar autenticado`);
      window.location.replace('index.html');
      return;
    }
    const nombre = $('#nombre').val();
    const tipo = $('#tipo').val();
    const stock = $('#stock').val();
    producto.crearProducto(user.uid, user.email, nombre, tipo, stock)
      .then(resp => {
        alert(`Producto creado correctamente`);
        window.location.replace('main.html');
      })
      .catch(err => {
        console.log(`Error => ${err}`);
        alert(`Error => ${err}`);
      });
  });

  $('#btnVolver').click(() => {
    window.location.replace('main.html'); // Redirigir a la página principal
  });


  $('#btnEditarProducto').click(() => {

    const producto = new Producto();
    const user = firebase.auth().currentUser;
    if (user == null) {
      alert(`Para crear el producto debes estar autenticado`);
      window.location.replace('index.html');
      return;
    }
    const idProducto =  localStorage.getItem("idproducto");
    const nombre = $('#nombre').val();
    const tipo = $('#tipo').val();
    const stock = $('#stock').val();
    producto.actualizarProducto(idProducto, nombre, tipo, stock)
      .then(() => {
        localStorage.removeItem("nombre")
        localStorage.removeItem("tipo")
        localStorage.removeItem("stock")
        localStorage.removeItem("idproducto");
        alert(`Producto actualizado correctamente`);
        window.location.replace('main.html');
      })
      .catch(err => {
        console.log(`Error => ${err}`);
        alert(`Error => ${err}`);
      });
  });



  $('#btnBuscar').click(() => {
    const tipo = $('#tipo').val();

    const producto = new Producto();
    if (tipo.length>0){
      producto.produtosxTipo(tipo);
    } else producto.todosProdutos();

  })

  $('#formularioEdicion').ready( () => {
    $('#nombre').val(localStorage.getItem("nombre"));
    $('#tipo').val(localStorage.getItem("tipo"));
    $('#stock').val(localStorage.getItem("stock"));
  } );

})


function preEditar(idProducto) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const producto = new Producto();
      producto.obtenerProducto(idProducto).then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          localStorage.setItem("idproducto",idProducto);
          localStorage.setItem("nombre",data.nombre);
          localStorage.setItem("tipo",data.tipo);
          localStorage.setItem("stock",data.stock);

          window.location.replace('editar.html')
        } else {
          console.log("No se encontró el producto");
        }
      }).catch((error) => {
        console.error("Error obteniendo el producto:", error);
      });
    } else {
      alert('Para editar el producto debes estar autenticado');
      window.location.replace('index.html');
    }
  });
}


function preBorrado(idProducto){
  //console.log(idProducto)
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const producto = new Producto();

      if (window.confirm('¿Deseas borrar el producto?')){
          producto.borrarProducto(idProducto)
          .then(() => {
            alert(`Producto borrado correctamente`);
            window.location.replace('main.html');
          })
          .catch(err => {
            console.log(`Error => ${err}`);
            alert(`Error => ${err}`);
          })
        }
      }
    else {
        alert(`Para crear el producto debes estar autenticado`);
        window.location.replace('index.html');
        return;
      }
      
  })
}

