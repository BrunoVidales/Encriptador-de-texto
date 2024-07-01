// Variables
const botonEncriptar = document.getElementById('encriptar');

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    botonEncriptar.addEventListener('click', validarMensaje);
});


// Funciones

// Validación del mensaje
function validarMensaje() {
    let mensajeIngresado = document.getElementById('mensaje').value.trim();
    
    // Comprobar si tiene acento, mayusculas el valor con expresiones regulares 
    let regex = /^([a-z]+\s)*[a-z]+$/;
    if(!regex.test(mensajeIngresado) || mensajeIngresado === '') {
        botonEncriptar.setAttribute('disabled', 'true');
        const parrafo = document.querySelector('.main__mensaje-error');
        parrafo.style.display = 'block';
        setTimeout(() => {
            parrafo.style.display = 'none';
            botonEncriptar.removeAttribute('disabled');
        }, 3500);
        return;
    } 

    encriptarMensaje(mensajeIngresado);
}

// Encriptar mensaje 
function encriptarMensaje(mensaje) {
    let mensajeEncriptado = '';
    for(let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        switch(letra) {
            case 'a':
                mensajeEncriptado += 'ai';
                break;
            case 'e':
                mensajeEncriptado += 'enter';
                break;
            case 'i':
                mensajeEncriptado += 'imes';
                break;
            case 'o':
                mensajeEncriptado += 'ober';
                break;
            case 'u':
                mensajeEncriptado += 'ufat';
                break;
            default:
                mensajeEncriptado += letra;
                break;
        }
    }
    console.log(mensajeEncriptado);
}

