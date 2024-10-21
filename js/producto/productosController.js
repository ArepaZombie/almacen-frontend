$(() => {

    $('#btnRegistrarProducto').click(()=>{

        const producto = new Producto()

        
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
           const nombre = $('#nombre').val();
        const tipo = $('#tipo').val();
        const stock = $('#stock').val();

        console.log(nombre)

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
          } else {
            alert(`Para crear el producto debes estar autenticado`)
            window.location.replace('index.html');
            return  
          }
        });

    });









})