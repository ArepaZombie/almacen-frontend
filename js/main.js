window.addEventListener('load', function(){
    const btnnuevo = this.document.getElementById('btnNuevo');
    const btncerrarsesion = this.document.getElementById('btnCerrarSesion');

    btnnuevo.addEventListener('click',function(){
        window.location.replace('nuevo.html')
    })

    btncerrarsesion.addEventListener('click',function(){
        window.location.replace('index.html')
    })
});