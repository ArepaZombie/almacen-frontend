$(()=>{
    const auth = new Autenticacion()

    $("#btnIniciarSesion").click(() => {
        const email = $('#email').val();
        const password = $('#password').val();
        // TODO : LLamar auth cuenta con email
        auth.autEmailPass(email , password)
    });

    $("#btnIniciarGoogle").click(() => auth.authCuentaGoogle() );

    $("#btnRegistro").click(() => {
        const nombres = $('#nombre').val();
        const email = $('#email').val();
        const password = $('#password').val();
        auth.crearCuentaEmailPass( email , password , nombres)
    });

    $("#btnLogout").click(() => auth.authLogout())


});