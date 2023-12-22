import {getSimpson, getSimpsonFiltrado} from "./getSimpson.mjs"
import { getPagina, cambiarValorSelectorDePagina, getPaginaDinamica} from "./botonesCambioDePagina.mjs"
import {filtrarSimpson,maxGuardarPersonajesFiltrados2} from "./seletoresGeneroYEstado.mjs"
import { array2 } from "./getSegundoFiltro.mjs"
import { buscarSimpson, todosLosPersonajes } from "./buscarBoton.mjs"
/***************************************************** */

const contenedorSimpsons = document.getElementById("contenedor-simpson")
const selectorElegirGenero = document.getElementById("elegir-genero")
const selectorElegirEstado = document.getElementById("elegir-estado")
const botonBuscar = document.getElementById("boton-buscar")
const inputSimpson = document.getElementById("busqueda-simpsons")
const botonPaginaAnterior = document.getElementById("boton-pagina-anterior")
const botonPaginaSiguiente = document.getElementById("boton-siguiente-pagina")
const selectorDePagina = document.getElementById("elegir-pagina")
const selectorDinamicoDePagina = document.getElementById("selectorDePaginaDinamico")
const botonPaginaAnteriorDinamico = document.getElementById("boton-pagina-anterior-dinamico")
const botonPaginaSiguienteDinamico = document.getElementById("boton-siguiente-pagina-dinamico")
const botonPaginaAnteriorDinamico2 = document.getElementById("boton-pagina-anterior-dinamico-2")
const botonPaginaSiguienteDinamico2 = document.getElementById("boton-siguiente-pagina-dinamico-2")
const selectorDinamicoDePagina2 = document.getElementById("selectorDePaginaDinamico2")
const letrasFiltrarPorGenero = document.getElementById("filtrar-por-genero")
const letrasFiltrarPorEstado = document.getElementById("filtrar-por-estado")

/*Variables aparte*/
let valorSelectorDePagina = "1";
//variable que me sirve para saber si estoy en el filtro simple o doble
let filtroDoble = false;
//esta variable me sirve para reutilizar codigo y distinguir quien me llama si el boton de pagina anterior o el de siguiente, esta variable la uso tanto como para los botones normales y los dinamicos
let identificadorDeBotonesPagina = 0;
//variable que me almacena el valor del input ingresado
let valorInput = null;
//esta variable me sirve para distinguir, para cambiar de paginas, entre cuando se busca y cuando se filtra
let estoyFiltrando = false;
//variable que me indica si primero buscaron, a futuro se va a utilizar para que si primero buscan y dsp aplican un filtro se filtre eso que buscaron
let primeroBusque = false;
//variable que me indica que aplique un filtro, a futuro se va a utilizar para que cuando filtre y dsp quiera buscar busque adentro del filtro
let primeroFiltre = false;
/*Variables aparte*/

/**************************NORMAL****************************/
function manejoSelectorDePagina(page) {
        getSimpson(parseInt(page)); 
        valorSelectorDePagina = page;
        botonPaginaAnterior.disabled = false;
        botonPaginaSiguiente.disabled = false;  
}

selectorDePagina.addEventListener('change', (e) => {
    manejoSelectorDePagina(e.target.value);
});

// llamo al manejador del nro de pagina para que me desabilite los botones de siguiente y atras hasta que no elija una página
manejoSelectorDePagina(selectorDePagina.value);

botonPaginaAnterior.addEventListener('click', () => {
    //inicializo el identificador con -1 para saber que estoy seleccionando el boton de pagina anterior
    identificadorDeBotonesPagina = -1;

    //llamo al metodo getpaginaanterior y le hago un parseInt para poder trabajarlo como un numero
    getPagina(parseInt(valorSelectorDePagina), identificadorDeBotonesPagina)

    //actualizo el valor de la pagina del selector, tengo que hacer el parseInt para que no me lo tome como cadena
    valorSelectorDePagina = cambiarValorSelectorDePagina(parseInt(valorSelectorDePagina), identificadorDeBotonesPagina)

    //inicializo de nuevo en cero el identificador
    identificadorDeBotonesPagina = 0;
})

botonPaginaSiguiente.addEventListener('click', () => {
    //inicializo el identificador con 1 para saber que estoy seleccionando el boton de pagina siguiente
    identificadorDeBotonesPagina = 1;

    //llamo al metodo getpaginasiguiente y le hago un parseInt para poder trabajarlo como un numero
    getPagina(parseInt(valorSelectorDePagina), identificadorDeBotonesPagina)

    //actualizo el valor de la pagina del selector, tengo que hacer el parseInt para que no me lo tome como cadena
    valorSelectorDePagina = cambiarValorSelectorDePagina(parseInt(valorSelectorDePagina), identificadorDeBotonesPagina)
    
    //inicializo de nuevo en cero el identificador
    identificadorDeBotonesPagina = 0;

})

inputSimpson.addEventListener('input', (e) => {

    estoyFiltrando = false;

    if (primeroFiltre == false) {

        selectorElegirEstado.hidden = true;
        selectorElegirGenero.hidden = true;
        letrasFiltrarPorEstado.hidden = true;
        letrasFiltrarPorGenero.hidden = true;
        
        if (e.target.value == "") {
            valorSelectorDePagina = "1";
            //llamo al manejador para que me cargue de nuevo todos los personajes
            manejoSelectorDePagina(valorSelectorDePagina)
            //oculto lo dinamico
            selectorDinamicoDePagina.hidden = true;
            botonPaginaAnteriorDinamico.hidden = true;
            botonPaginaSiguienteDinamico. hidden = true;
            //deshabilito el boton de buscar
            botonBuscar.disabled = true;
            //vuelvo a mostrar el selector de pagina normal
            selectorDePagina.hidden = false;
            //habilito de nuevo los selectores de genero y estado
            selectorElegirEstado.hidden = false;
            selectorElegirGenero.hidden = false;
            letrasFiltrarPorEstado.hidden = false;
            letrasFiltrarPorGenero.hidden = false;

        } else {
            //vacio el contenedor asi no me aparece ningun simpson hasta que aprete el boton buscar e indico por las dudas que se debe apretar el boton buscar
            contenedorSimpsons.innerHTML =`
            <div>DEBE APRETAR EL BOTON BUSCAR</div>
            `
            //le asigno a valorInput el input ingresado
            valorInput = e.target.value
            //habilito el boton de buscar
            botonBuscar.disabled = false;
            //deshabilito todo lo estatico
            selectorDePagina.hidden = true;
            botonPaginaAnterior.hidden = true;
            botonPaginaSiguiente.hidden = true;
            
        }
    }
    
})

botonBuscar.addEventListener('click', () => {
    //aclaro que el filtro doble es falso
    filtroDoble = false;
    buscarSimpson(valorInput,filtroDoble, primeroBusque)
})


/**************************NORMAL****************************/

/**************************FILTRADOS SIMPLES****************************/

//escucha cuando se cambia el estado
selectorElegirEstado.addEventListener('change', (e) => {

    estoyFiltrando = true;

    if (primeroBusque == false) {

        inputSimpson.disabled = true;
        botonBuscar.disabled = true;
        

        if (e.target.value != "Ninguno" && (selectorElegirGenero.value == "Ninguno" || selectorElegirGenero.value != "Ninguno")) {
    
            botonPaginaAnterior.hidden = true;
            botonPaginaSiguiente.hidden = true;
            filtrarSimpson(e.target.value);
        
        } else if (e.target.value == "Ninguno" && selectorElegirGenero.value != "Ninguno") {
            
            botonPaginaAnterior.hidden = true;
            botonPaginaSiguiente.hidden = true;
            filtrarSimpson(selectorElegirGenero.value);

            //vuelvo a activar las opciones que habia desactivado
            for (let i = 0; i < selectorElegirEstado.options.length; i++) {
                selectorElegirEstado.options[i].disabled = false;; 
            }
    
        }

        if (e.target.value == "Ninguno" && selectorElegirGenero.value == "Ninguno") {
            valorSelectorDePagina = "1"
            selectorDinamicoDePagina.hidden = true;
            botonPaginaAnteriorDinamico.hidden = true;
            botonPaginaSiguienteDinamico.hidden = true;
    
            botonPaginaAnteriorDinamico2.hidden = true;
            botonPaginaSiguienteDinamico2.hidden = true;
            selectorDinamicoDePagina2.hidden = true;

            // por las dudas vuelvo a activar las opciones que habia desactivado
            for (let i = 0; i < selectorElegirEstado.options.length; i++) {
                selectorElegirEstado.options[i].disabled = false;; 
            }

            //por las dudas vuelvo a activar las opciones que habia desactivado
            for (let i = 0; i < selectorElegirGenero.options.length; i++) {
                selectorElegirGenero.options[i].disabled = false;; 
            }

            inputSimpson.disabled = false;
            botonBuscar.disable = false;

            selectorDePagina.hidden = false;
            contenedorSimpsons.innerHTML = ``
            manejoSelectorDePagina(valorSelectorDePagina)
        }
    }
    
    
})

//escucha cuando se cambia el genero
selectorElegirGenero.addEventListener('change', (e) => {
    estoyFiltrando = true;

    if (primeroBusque == false) {

        inputSimpson.disabled = true;
        botonBuscar.disabled = true;
        
        if (e.target.value != "Ninguno" && (selectorElegirEstado.value == "Ninguno" || selectorElegirEstado.value != "Ninguno")) {
        
            botonPaginaAnterior.hidden = true;
            botonPaginaSiguiente.hidden = true;
            filtrarSimpson(e.target.value);
    
        } else if (e.target.value == "Ninguno" && selectorElegirEstado.value != "Ninguno") {
            
            //vuelvo a activar las opciones que habia desactivado
            for (let i = 0; i < selectorElegirGenero.options.length; i++) {
                selectorElegirGenero.options[i].disabled = false;; 
            }

            botonPaginaAnterior.hidden = true;
            botonPaginaSiguiente.hidden = true;
            filtrarSimpson(selectorElegirEstado.value);
        }
        if (e.target.value == "Ninguno" && selectorElegirEstado.value == "Ninguno") {
            valorSelectorDePagina = "1"
            selectorDinamicoDePagina.hidden = true;
            botonPaginaAnteriorDinamico.hidden = true;
            botonPaginaSiguienteDinamico.hidden = true;
    
            botonPaginaAnteriorDinamico2.hidden = true;
            botonPaginaSiguienteDinamico2.hidden = true;
            selectorDinamicoDePagina2.hidden = true;
            
            //por las dudas vuelvo a activar las opciones que habia desactivado
            for (let i = 0; i < selectorElegirEstado.options.length; i++) {
                selectorElegirEstado.options[i].disabled = false;; 
            }

            //por las dudas vuelvo a activar las opciones que habia desactivado
            for (let i = 0; i < selectorElegirGenero.options.length; i++) {
                selectorElegirGenero.options[i].disabled = false;; 
            }

            inputSimpson.disabled = false;
            botonBuscar.disable = false;

            selectorDePagina.hidden = false;
            contenedorSimpsons.innerHTML = ``
            manejoSelectorDePagina(valorSelectorDePagina)
        } 

    }

})

//escucha cuando se cambia el valor del selector de pagina dinamico
selectorDinamicoDePagina.addEventListener('change', (e) => {

    filtroDoble = false;
    //si estoy filtrando hago esto
    if (estoyFiltrando == true) {
    
        getSimpsonFiltrado(maxGuardarPersonajesFiltrados2, parseInt(e.target.value),filtroDoble)

    //si no estoy filtrando hago esto
    }else {
        getSimpsonFiltrado( todosLosPersonajes, parseInt(e.target.value),filtroDoble)
    }
})

//boton de cambio a pagina anterior de personajes filtrados
botonPaginaAnteriorDinamico.addEventListener('click', () => {
    
    filtroDoble = false;
    //inicializo el identificador con 1 para saber que estoy seleccionando el boton de pagina siguiente
    identificadorDeBotonesPagina = -1;

    //hago este if para saber si estoy filtrando o estoy buscando
    if (estoyFiltrando == true) {
        //llamo al metodo getpaginaDinamica y le hago un parseInt para poder trabajarlo como un numero
        getPaginaDinamica(parseInt(selectorDinamicoDePagina.value),identificadorDeBotonesPagina,maxGuardarPersonajesFiltrados2,filtroDoble)
    
    } else {
        getPaginaDinamica(parseInt(selectorDinamicoDePagina.value),identificadorDeBotonesPagina,todosLosPersonajes,filtroDoble)
    }

    //inicializo de nuevo en cero el identificador
    identificadorDeBotonesPagina = 0;
})

//boton de cambio a pagina siguiente de personajes filtrados
botonPaginaSiguienteDinamico.addEventListener('click', () => {
    filtroDoble = false;
    
    //inicializo el identificador con 1 para saber que estoy seleccionando el boton de pagina siguiente
    identificadorDeBotonesPagina = 1;

    if (estoyFiltrando == true) {
        //llamo al metodo getpaginaDinamica y le hago un parseInt para poder trabajarlo como un numero

        getPaginaDinamica(parseInt(selectorDinamicoDePagina.value),identificadorDeBotonesPagina,maxGuardarPersonajesFiltrados2,filtroDoble)
    } else {

        getPaginaDinamica(parseInt(selectorDinamicoDePagina.value),identificadorDeBotonesPagina,todosLosPersonajes,filtroDoble)
    }
    
    //inicializo de nuevo en cero el identificador
    identificadorDeBotonesPagina = 0;
})
/**************************FILTRADOS SIMPLES****************************/

/**************************FILTRADOS DOBLE****************************/
selectorDinamicoDePagina2.addEventListener('change', (e) => {
    filtroDoble = true;
    getSimpsonFiltrado(array2, parseInt(e.target.value),filtroDoble)
})

botonPaginaAnteriorDinamico2.addEventListener('click', () => {
    filtroDoble = true;
    //inicializo el identificador con 1 para saber que estoy seleccionando el boton de pagina siguiente
    identificadorDeBotonesPagina = -1;

    //llamo al metodo getpaginaDinamica y le hago un parseInt para poder trabajarlo como un numero
    getPaginaDinamica(parseInt(selectorDinamicoDePagina2.value),identificadorDeBotonesPagina,array2,filtroDoble)

    //inicializo de nuevo en cero el identificador
    identificadorDeBotonesPagina = 0;

})

botonPaginaSiguienteDinamico2.addEventListener('click', () => {
    //indico que estoy haciendo el segundo filtro
    filtroDoble = true;
    //inicializo el identificador con 1 para saber que estoy seleccionando el boton de pagina siguiente
    identificadorDeBotonesPagina = 1;
    
    //llamo al metodo getpaginaDinamica y le hago un parseInt para poder trabajarlo como un numero
    getPaginaDinamica(parseInt(selectorDinamicoDePagina2.value),identificadorDeBotonesPagina,array2,filtroDoble)

    //inicializo de nuevo en cero el identificador
    identificadorDeBotonesPagina = 0;
})

/**************************FILTRADOS DOBLE****************************/