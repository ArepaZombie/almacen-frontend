$(() => {

    $('#btnNuevo').click(()=>{

        const producto = new Producto()

        const user = firebase.auth().currentUser
        if (user == null) {
          alert(`Para crear el producto debes estar autenticado`)
          window.location.replace('index.html');
          return
        }

        const nombre = $('#nombre').val();
        const tipo = $('#tipo').val();
        const stock = $('#stock').val();

        producto.crearProducto(
            user.uid,
            user.email,
            nombre,
            tipo,
            stock
        ).then(resp => {
            alert(`Producto creado correctamente`)
            window.location.replace('main.html')
          })
          .catch(err => {
            console.log(`Error => ${err}`)
            alert(`Error => ${err}`)
          })

    });









})