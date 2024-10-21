class Autenticacion{


  autEmailPass (email, password) {
      firebase.auth().signInWithEmailAndPassword(email , password)
      .then( result => {
          
          if(result.user != null ){
              alert("Sesión iniciada")
              window.location.replace("main.html")
            }else {
              firebase.auth().signOut();
              alert("Ingrese credenciales correctas")
            }
  
        } ).catch(error => {
          console.error(error)
          alert("Ingrese credenciales correctas")
  
        }) 
  
        //$('.modal').modal('close')       
  }
    
  crearCuentaEmailPass (email, password, nombres) {
    firebase.auth().createUserWithEmailAndPassword(email , password)
      .then( result => {
        result.user.updateProfile({
          displayName : nombres
        })

        const configuracion = { 
          url : 'http://localhost:5173/main.html'
        }

        result.user.sendEmailVerification(configuracion).catch(error => {
          console.error(error)
          alert( error.message)
        } )
          firebase.auth().signOut()
          alert(`Bienvenido ${nombres}, debes confirmar tu email`)
      } )
      .catch(error => {
        console.error(error)
        alert( error.message)

      })    
  }

  authCuentaGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider()    
    firebase.auth().signInWithPopup(provider)
      .then( result =>  {
        alert(`Bienvenido ${result.user.displayName} !! `)
        window.location.replace("main.html")
      })
      .catch ( error => {
        console.error(error)
        alert(`Error al autenticarse con google  ${error}  `)
      } )

  }

  authLogout(){
    return firebase.auth().signOut().then(() => {
      window.location.replace('index.html')
      alert(`Sesión cerrada`)
    })
    .catch(error => {
      alert(`Error al cerrar sesión`)
    })
  }

}