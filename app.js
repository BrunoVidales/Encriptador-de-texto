document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const mensajeIngresado = document.querySelector('#mensaje');
    const botonesMain = document.querySelectorAll('.main__boton');
    const mensajeRecibido = document.querySelector('.aside__texto');
    const botonCopiar = document.querySelector('.aside__copiar');
    const asideInfo = document.querySelector('.aside__info');
    const cifrado = {
        a: 'ai',
        e: 'enter',
        i: 'imes',
        o: 'ober',
        u: 'ufat' 
    };
    
    // Evento
    botonesMain.forEach(boton =>  {
        boton.addEventListener('click', (e) => {
            validarMensaje(e.target);
        });
    });
    botonCopiar.addEventListener('click', copiarMensaje);

    // Funciones

    // Funcion validar mensaje
    function validarMensaje(boton) {
        // Comprobar si tiene acento, mayusculas el valor con expresiones regulares 
        let regex = /^[a-z0-9 ñ]*$/;
        if(!regex.test(mensajeIngresado.value.trim())) {
            errorMensaje('Error: Solo letras minúsculas y sin acentos.');
            setTimeout(() => {
                removerErrorMensaje('Solo letras minúsculas y sin acentos');
            }, 3500);
            return;
        };

        if(mensajeIngresado.value === '') {
            errorMensaje('Error: Ingresa un mensaje válido');
            setTimeout(() => {
                removerErrorMensaje('Solo letras minúsculas y sin acentos');
            }, 3500);
            return;
        }

        // Almaceno el mensaje
        let mensajeGuardado = mensajeIngresado.value;

        // Limpio el textarea luego de encriptar el mensaje
        mensajeIngresado.value = '';
        
        // Obtengo el mensaje en las funciones
        if(boton.name === 'encriptar') {
            encriptarMensaje(mensajeGuardado);
            return;
        }
        desecriptarMensaje(mensajeGuardado);
    };

    // Funcion encriptar mensaje
    function encriptarMensaje(mensaje) {
        let mensajeEncriptado = '';
        mensaje.split('').forEach(letra => {
            if(Object.keys(cifrado).includes(letra)) {
                mensajeEncriptado += cifrado[letra];
                return;
            } 
            mensajeEncriptado += letra;
        });
        recibirMensaje(mensajeEncriptado);
    };

    // Funcion desencriptar mensaje
    function desecriptarMensaje(mensaje) {
        let mensajeArreglo = mensaje.split('');
        for(let i = 0; i < mensajeArreglo.length; i++) {
            if(Object.keys(cifrado).includes(mensajeArreglo[i])) {
                // Verificar si las letras que siguen a la vocal corresponde con el valor para esa letra en el obj 
                const valor = cifrado[mensajeArreglo[i]];
                if(mensajeArreglo.slice(i, i + valor.length).join('') === valor) {
                    mensajeArreglo.splice(i + 1, valor.length - 1);
                };
            };
        };
        recibirMensaje(mensajeArreglo.join(''))
    };


    // Funcion recibir mensaje encriptado o desencriptado
    function recibirMensaje(mensaje) {
        if(mensaje) {
            asideInfo.classList.add('d-none');
            mensajeRecibido.classList.remove('d-none')
            botonCopiar.classList.remove('d-none');
            mensajeRecibido.textContent = mensaje;
        }
    }

    // Funcion para copiar el mensaje
    async function copiarMensaje() {
        try {
            if(mensajeRecibido.value) {
                await navigator.clipboard.writeText(mensajeRecibido.value);
                botonCopiar.classList.add('aside__copiar-correcto');
                limpiar();
                setTimeout(() => {
                    botonCopiar.classList.remove('aside__copiar-correcto');
                }, 1500);
            };
        } catch (error) {
            console.log('el texto no pudo ser copiado');
        };
    };
    
    // Funcion error al ingresar texto
    function errorMensaje(texto) {
        const imgUno = document.querySelector('.aside__img img:nth-child(1)');
        const imgDos = document.querySelector('.aside__img img:nth-child(2)');
        imgUno.classList.add('d-none');
        imgDos.classList.remove('d-none');
        const errorParrafo = document.querySelector('.main__error');
        errorParrafo.textContent = texto;
        errorParrafo.style.color = '#ff2a2a';
    }

    // Funcion para remover errorMensaje
    function removerErrorMensaje(texto) {
        const imgUno = document.querySelector('.aside__img img:nth-child(1)');
        const imgDos = document.querySelector('.aside__img img:nth-child(2)');
        imgUno.classList.remove('d-none');
        imgDos.classList.add('d-none');
        const errorParrafo = document.querySelector('.main__error');
        errorParrafo.textContent = texto;
        errorParrafo.style.color = 'var(--primario)';
    }

    // Funcion para limpiar una vez que se copie el mensaje
    function limpiar() {
        asideInfo.classList.remove('d-none');
        mensajeRecibido.classList.add('d-none');
        botonCopiar.classList.add('d-none');
    }
});
