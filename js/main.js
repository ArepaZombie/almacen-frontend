window.addEventListener('load', function(){
    const btnnuevo = this.document.getElementById('btnNuevoProducto');
    const btnNuevoUsuario = this.document.getElementById('btnNuevoUsuario');

    
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.displayName)
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/v8/firebase.User
          var uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });

    btnnuevo.addEventListener('click',function(){
        window.location.replace('nuevo.html')
    })

    btnNuevoUsuario.addEventListener('click',function(){
        window.location.replace('registro.html')
    })
});