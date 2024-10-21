window.addEventListener('load', function(){
    const btnnuevo = this.document.getElementById('btnNuevoProducto');
    const btnNuevoUsuario = this.document.getElementById('btnNuevoUsuario');



    btnnuevo.addEventListener('click',function(){
        window.location.replace('nuevo.html')
    })

    btnNuevoUsuario.addEventListener('click',function(){
        window.location.replace('registro.html')
    })
});