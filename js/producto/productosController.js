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
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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
      } else {
        alert(`Para crear el producto debes estar autenticado`);
        window.location.replace('index.html');
        return;
      }
    });
    if (user == null) {

    }
    
  });

  $('#btnVolver').click(() => {
    window.location.replace('main.html'); // Redirigir a la página principal
  });

    // boton para actulizar  
    $('#btnActualizar').click(() => {
      const producto = new Producto();


      if (user == null) {
        alert(`Para crear el producto debes estar autenticado`);
        window.location.replace('index.html');
        return;
      }

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

    $('#btnEditar').click((event) => {
      const idProducto = $(event.target).data('id');

      if (user == null) {
        alert(`Para crear el producto debes estar autenticado`);
        window.location.replace('index.html');
        return;
      }

      window.location.replace(`editar.html?id=${idProducto}`);
    });


    $('#btnBorrar').click(() => {
      const producto = new Producto();
      const idProducto = $('#idProducto').val();

      if (user == null) {
        alert(`Para crear el producto debes estar autenticado`);
        window.location.replace('index.html');
        return;
      }

      producto.borrarProducto(idProducto)
        .then(() => {
          alert(`Producto borrado correctamente`);
          window.location.replace('main.html');
        })
        .catch(err => {
          console.log(`Error => ${err}`);
          alert(`Error => ${err}`);
        });
    });

    $('#btnBuscar').click(() => {
    
      const tipo = $('#tipo').val();

      if (tipo.length>0){
        const producto = new Producto();
        producto.produtosxTipo(tipo);
      }

    })

})

function preBorrado(idProducto){
  console.log(idProducto)
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const producto = new Producto();

      window.confirm()

      producto.borrarProducto(idProducto)
      .then(() => {
        alert(`Producto borrado correctamente`);
        window.location.replace('main.html');
      })
      .catch(err => {
        console.log(`Error => ${err}`);
        alert(`Error => ${err}`);})
      }
    else {
        alert(`Para crear el producto debes estar autenticado`);
        window.location.replace('index.html');
        return;
      }
      
  })
}
  
function preEditar(idProducto){
  this.db.collection('productos').doc(idProducto).then(
    (producto) => console.log(producto)
  )
}