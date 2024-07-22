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
        if(!regex.test(mensajeIngresado.value.trim()) || mensajeIngresado.value === '') {
            errorMensaje('img/astro2.webp', 'Error: Solo letras minúsculas y sin acentos.', '#ff2a2a');
            setTimeout(() => {
                removerErrorMensaje('img/astro.webp', 'Solo letras minúsculas y sin acentos', 'var(--primario)');
            }, 3500);
            return;
        };
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
            };
        } catch (error) {
            console.log('el texto no pudo ser copiado');
        };
    };
    
    // Funcion error al ingresar texto
    function errorMensaje(src, texto, color) {
        const img = document.querySelector('.aside__img img');
        img.src = src;
        const errorParrafo = document.querySelector('.main__error');
        errorParrafo.textContent = texto;
        errorParrafo.style.color = color;
    }

    // Funcion para remover errorMensaje
    function removerErrorMensaje(src, texto, color) {
        const img = document.querySelector('.aside__img img');
        img.src = src;
        const errorParrafo = document.querySelector('.main__error');
        errorParrafo.textContent = texto;
        errorParrafo.style.color = color;
    }
});
