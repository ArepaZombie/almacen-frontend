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
  }
    
  crearCuentaEmailPass (email, password, nombres) {
    firebase.auth().createUserWithEmailAndPassword(email , password)
      .then( result => {
        result.user.updateProfile({
          displayName : nombres
        })

        const configuracion = { 
          url : 'http://localhost:5173/index.html'
        }

        result.user.sendEmailVerification(configuracion).catch(error => {
          console.error(error)
          alert( error.message)
        } )
          firebase.auth().signOut()
          alert(`Registrado ${nombres}!`)
          window.location.replace('main.html')
      } )
      .catch(error => {
        console.error(error)
        alert( error.message)

      })    
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