import {getSimpson, getSimpsonFiltrado} from "./getSimpson.mjs"

/***************************************************** */
const contenedorSimpsons = document.getElementById("contenedor-simpson")
const selectorDePagina = document.getElementById("elegir-pagina")
const selectorDinamicoDePagina = document.getElementById("selectorDePaginaDinamico")
const selectorDinamicoDePagina2 = document.getElementById("selectorDePaginaDinamico2")

/*Variables aparte*/
//Esta variable almacena el valor de la pagina siguiente, la declaro como una variable global
let paginaSiguiente = null;
//Esta variable almacena el valor de la pagina anterior, la declaro como una variable global
let paginaAnterior = null;
//Esta variable almacena el valor de la pagina siguiente, la declaro como una variable global
let paginaSiguienteDinamica = null;
//Esta variable almacena el valor de la pagina anterior, la declaro como una variable global
let paginaAnteriorDinamica = null;
/*Variables aparte*/

const getPagina = async (page, identificador) => {

        if (identificador == -1) {

            paginaAnterior = page - 1

            //dejo en blanco el contenedor
            contenedorSimpsons.innerHTML = ``
        
            //llamo a getSimpson con el valor de la pagina anterior
            getSimpson(paginaAnterior)

            //cambio el valor del selector de pagina
            selectorDePagina.value = paginaAnterior

        } else {

            //agrego el valor de la pagina siguiente a la cual me quiero mover
            paginaSiguiente = page + 1

            //dejo en blanco el contenedor
            contenedorSimpsons.innerHTML = ``
        
            //llamo a getSimpson con el valor de la pagina anterior
            getSimpson(paginaSiguiente)

            //cambio el valor del selector de pagina
            selectorDePagina.value = paginaSiguiente

        }
        //si identificadorDeBotonesFiltrados es distinto de 2 entonces significa que estoy seleccionando en personajes filtrados
    
    }

//esta funcion me sirve para actualizar el valor actual del selector de pagina
function cambiarValorSelectorDePagina (valorSelectorDePagina, identificador) {

    if (identificador == -1) return valorSelectorDePagina - 1;
    if (identificador == 1) return valorSelectorDePagina + 1;
    
}

const getPaginaDinamica = async (page, identificador,array4,filtroDoble) => {
    if (filtroDoble == false) {
        if (identificador == -1) {
            
            paginaAnteriorDinamica = page - 1
            
            //dejo en blanco el contenedor
            contenedorSimpsons.innerHTML = ``
            
            //llamo a getSimpson con el valor de la pagina anterior
            getSimpsonFiltrado(array4,paginaAnteriorDinamica,filtroDoble)

            //cambio el valor del selector de pagina
            selectorDinamicoDePagina.value = paginaAnteriorDinamica

        } else {
            
            //agrego el valor de la pagina siguiente a la cual me quiero mover
            paginaSiguienteDinamica = page + 1

            //dejo en blanco el contenedor
            contenedorSimpsons.innerHTML = ``
            
            //llamo a getSimpson con el valor de la pagina anterior
            getSimpsonFiltrado(array4,paginaSiguienteDinamica,filtroDoble)

            //cambio el valor del selector de pagina
            selectorDinamicoDePagina.value = paginaSiguienteDinamica

        }
    } else {
        if (identificador == -1) {
            
            paginaAnteriorDinamica = page - 1
            
            //dejo en blanco el contenedor
            contenedorSimpsons.innerHTML = ``
            
            //llamo a getSimpson con el valor de la pagina anterior
            getSimpsonFiltrado(array4,paginaAnteriorDinamica,filtroDoble)

            //cambio el valor del selector de pagina
            selectorDinamicoDePagina2.value = paginaAnteriorDinamica

        } else {
            
            //agrego el valor de la pagina siguiente a la cual me quiero mover
            paginaSiguienteDinamica = page + 1

            //dejo en blanco el contenedor
            contenedorSimpsons.innerHTML = ``
            
            //llamo a getSimpson con el valor de la pagina anterior
            getSimpsonFiltrado(array4,paginaSiguienteDinamica,filtroDoble)

            //cambio el valor del selector de pagina
            selectorDinamicoDePagina2.value = paginaSiguienteDinamica
        }    
    }
}    


/******************************************************/
export {getPagina, cambiarValorSelectorDePagina,getPaginaDinamica} 