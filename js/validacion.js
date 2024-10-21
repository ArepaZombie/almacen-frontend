window.addEventListener('load', function(){

    const btnenviar = this.document.getElementById('btnEnviar');

    btnenviar.addEventListener('click',function(){    
        // Seleccionar todos los formularios con validación
        const forms = document.querySelectorAll('.needs-validation');
        
        // Iterar sobre cada formulario y agregar evento de submit
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                // Prevenir envío si el formulario no es válido
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                
                // Agregar la clase para mostrar los mensajes de error
                form.classList.add('was-validated');
            }, false);
        });
        
    })
});