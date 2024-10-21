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

  // boton para actulizar  
  $('#btnActualizar').click(() => {
    const producto = new Producto();
    const idProducto = $('#idProducto').val();
    const nombre = $('#nombre').val();
    const tipo = $('#tipo').val();
    const stock = $('#stock').val();
    producto.actualizarProducto(idProducto, nombre, tipo, stock)
      .then(() => {
        alert(`Producto actualizado correctamente`);
        window.location.replace('main.html');
      })
      .catch(err => {
        console.log(`Error => ${err}`);
        alert(`Error => ${err}`);
      });
  });

  /*$('#btnEditarProducto').click(() => {
    const producto = new Producto();
    const nombre = $('#nombre').val();
    const tipo = $('#tipo').val();
    const stock = $('#stock').val();
    
    producto.actualizarProducto(idProducto, nombre, tipo, stock)
      .then(() => {
        alert(`Producto actualizado correctamente`);
        window.location.replace('main.html');
      })
      .catch(err => {
        console.log(`Error => ${err}`);
        alert(`Error => ${err}`);
      });
  });*/

  $('#btnBuscar').click(() => {
    const tipo = $('#tipo').val();
    const producto = new Producto();

    if (tipo.length>0){
      producto.produtosxTipo(tipo);
    } else producto.todosProdutos();

  })
})

function preEditar(idProducto) {
  window.location.replace(`editar.html?id=${idProducto}`);
}

function preEditar(idProducto) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const producto = new Producto();
      producto.obtenerProducto(idProducto).then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          $('#nombre').val(data.nombre);
          $('#tipo').val(data.tipo);
          $('#stock').val(data.stock);

          $('#btnEditar').click(() => {
            const nombre = $('#nombre').val();
            const tipo = $('#tipo').val();
            const stock = $('#stock').val();

            producto.actualizarProducto(idProducto, nombre, tipo, stock)
              .then(() => {
                alert('Producto actualizado correctamente');
                window.location.replace('main.html');
              })
              .catch(err => {
                console.log(`Error => ${err}`);
                alert(`Error => ${err}`);
              });
          });

          // Mostrar el formulario de edición si no está ya visible
          $('#formularioEdicion').show();
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
  console.log(idProducto)
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

