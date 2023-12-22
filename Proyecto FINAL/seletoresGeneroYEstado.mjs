import { getSegundoFiltro } from "./getSegundoFiltro.mjs"
import { getSimpsonFiltrado } from "./getSimpson.mjs"

/***************************************************** */
const contenedorSimpsons = document.getElementById("contenedor-simpson")
const selectorElegirGenero = document.getElementById("elegir-genero")
const selectorElegirEstado = document.getElementById("elegir-estado")
const botonPaginaAnterior = document.getElementById("boton-pagina-anterior")
const botonPaginaSiguiente = document.getElementById("boton-siguiente-pagina")
const selectorDePagina = document.getElementById("elegir-pagina")
const selectorDinamicoDePagina = document.getElementById("selectorDePaginaDinamico")
const botonPaginaAnteriorDinamico = document.getElementById("boton-pagina-anterior-dinamico")
const botonPaginaSiguienteDinamico = document.getElementById("boton-siguiente-pagina-dinamico")
const botonPaginaAnteriorDinamico2 = document.getElementById("boton-pagina-anterior-dinamico-2")
const botonPaginaSiguienteDinamico2 = document.getElementById("boton-siguiente-pagina-dinamico-2")
const selectorDinamicoDePagina2 = document.getElementById("selectorDePaginaDinamico2")

/*Variables aparte*/ 
//es el array que guarda los personajes que cumplen el filtro de genero o estado
let resultado = [];
//array que me guarda arrays de 10 elementos que equivalen a las paginas, es cuando filtro los personajes y tengo mas de 10, es decir que necesito mas de una pagina
let maxGuardarPersonajesFiltrados = [];
//array que me guarda hasta 10 personajes, representa una pagina
let miniGuardarPersonajesFiltrados = [];
//esta variable me sirve para reutilizar codigo y distinguir si filtro por estado, genero o ambos
let identificadorDeFiltros = 0;
//este array me sirve en caso de que hago filtro doble
let maxGuardarPersonajesFiltrados2= [];
//este array me sirve en caso de que hago filtro doble
let miniGuardarPersonajesFiltrados2= [];
//variable que me sirve para saber si estoy en el filtro simple o doble
let filtroDoble = false;
/*Variables aparte*/

const filtrarSimpson = async (value) => {

    contenedorSimpsons.innerHTML =``

    //deshabilito lo estatico
    selectorDePagina.hidden = true;
    botonPaginaAnterior.hidden = true;
    botonPaginaSiguiente.hidden = true;

    /***************************************************TRY-CATCH*********************************************** */
        
    try {
        const resolve = await fetch(`https://apisimpsons.fly.dev/api/personajes?limit=650&page=1`)
        const data = await resolve.json()

        //limpio el selector dinamico de pagina antes de llamar a la funcion eliminar
        selectorDinamicoDePagina.innerHTML=``

        //llamo a la funcion que me filtra los simpsons segun el estado seleccionado
        eliminarElementos(data, value); 
                
    }
    /***************************************************TRY-CATCH************************************************/
    catch (error) {
            console.log(error)
    }

    /***************************************************TRY-CATCH************************************************/    
}

function eliminarElementos (data, value) {
                    
    if (selectorElegirEstado.value == "Ninguno" || selectorElegirGenero.value == "Ninguno" ) {
        
        filtroDoble = false;

        //habilito lo dinamico
        selectorDinamicoDePagina.hidden = false;
        botonPaginaAnteriorDinamico.hidden = false;
        botonPaginaSiguienteDinamico.hidden = false;

        //deshabilito lo dinamico 2
        botonPaginaAnteriorDinamico2.hidden = true;
        botonPaginaSiguienteDinamico2.hidden = true;
        selectorDinamicoDePagina2.hidden = true;

        //hago este if para saber cual de los dos es ninguno, si genero o estado y poder filtrar
        if(selectorElegirEstado.value == "Ninguno") {

            //cuando identificadorDeFiltros es 1 significa que estado es ninguno y estoy filtrando primero por genero
            identificadorDeFiltros = 1;
            
            //la variable resultado me almacena por cada pagina los personajes que cumplen el genero que se busca
            resultado = data.docs.filter( char => char.Genero == value)
            
        } else {

            //cuando identificadorDeFiltros es 1 significa que genero es ninguno y filtra segun el estado
            identificadorDeFiltros = 2;
            
            //la variable resultado me almacena por cada pagina los personajes que cumplen el estado que se busca
            resultado = data.docs.filter( char => char.Estado == value)
            
        }
        
        //si hay menos o igual a 10 personajes que cumplen con el filtro
        if (resultado.length <= 10) {

            //deshabilito el boton para que puedan cambiar de pagina porque hay una sola
            selectorDinamicoDePagina.disabled = true;

            //creo la opcion de la pagina 1
            selectorDinamicoDePagina.innerHTML = `
                <option value="1" selected>1</option>
            `

            //deshablito los botones de cambio de pagina
            botonPaginaAnteriorDinamico.hidden = true;
            botonPaginaSiguienteDinamico.hidden = true;

            //guardo los personajes filtrados en el arreglo mini
            for(let j = 0; j< resultado.length; j++) {
                miniGuardarPersonajesFiltrados.push(resultado[j])
            }

            //guardo como un elemento en max el array mini 
            maxGuardarPersonajesFiltrados.push(miniGuardarPersonajesFiltrados)

            miniGuardarPersonajesFiltrados.forEach(personaje => {

                contenedorSimpsons.innerHTML += `
                <div class="book">
                <p>Historia: ${personaje.Historia}</p>
                <div></div>
                <p>Genero: ${personaje.Genero}</p>
                <p>Estado: ${personaje.Estado}</p>
                <p>Ocupacion: ${personaje.Ocupacion}</p>
                <div class="cover">
                    <img src="${personaje.Imagen}" alt="">
                    <p>${personaje.Nombre}</p>
                </div>
                </div>
                `
            });

            //vacio el arreglo de mini asi no se me acumulan los personajes
            miniGuardarPersonajesFiltrados = [];

            //vacio el arreglo de resultado por las dudas
            for (let index = 0; index < 10; index++) {
                resultado.shift()
            }
            //hago la copia de max en max2
            maxGuardarPersonajesFiltrados2 = maxGuardarPersonajesFiltrados

            //limpio max
            maxGuardarPersonajesFiltrados = [];

        //si hay mas de 10 personajes que cumplen con el filtro
        } else {

            //habilito todos los botones y el selector
            botonPaginaAnteriorDinamico.hidden = false;
            botonPaginaSiguienteDinamico.hidden = false;
            selectorDinamicoDePagina.disabled = false;

            while (resultado.length != 0) {

                for (let i = 0; i < 10; i++) {
                    miniGuardarPersonajesFiltrados.push(resultado[i])
                } 
                
                //guardo como un elemento en max el array mini 
                maxGuardarPersonajesFiltrados.push(miniGuardarPersonajesFiltrados);

                //vacio el arreglo de mini asi no se me acumulan los personajes
                miniGuardarPersonajesFiltrados = [];

                //hago esto para indicar en el ultimo elemento del array max que es la ultima pagina, entonces creo un objeto el cual lo voy a colocar dentro del mini array y va a tener una propiedad que me indica que es la ultima pagina
                if (resultado.length <= 10) {
                    let objetoQueMeIndicaUltimaPagina = {
                        ultPagina: true,
                    };

                    maxGuardarPersonajesFiltrados[maxGuardarPersonajesFiltrados.length - 1].push(objetoQueMeIndicaUltimaPagina)
                }

                //elimino los 10 elementos de resultado que acabo de guardar, asi no tengo un bucle infnito y sigo guardando los  siguientes
                for (let p = 0; p<10; p++) {
                    resultado.shift()
                }
                
            }

            //elimino del ultimo elemento del array max los lugares vacios
            for(let f = 0; f<10; f++){
                maxGuardarPersonajesFiltrados[maxGuardarPersonajesFiltrados.length - 1] = maxGuardarPersonajesFiltrados[maxGuardarPersonajesFiltrados.length - 1].filter(personaje => personaje != undefined )
            }
            
            //creo las paginas dinamicas segun cuantos elementos tenga en el arreglo max
            for (let o = 1; o<= maxGuardarPersonajesFiltrados.length;o++) {
                let newOption = new Option(o, o);
                selectorDinamicoDePagina.append(newOption);
            }
            
            maxGuardarPersonajesFiltrados2 = maxGuardarPersonajesFiltrados;
            //llamo a la primer pagina
            getSimpsonFiltrado(maxGuardarPersonajesFiltrados,parseInt(selectorDinamicoDePagina.value),filtroDoble);
            maxGuardarPersonajesFiltrados = [];
        } 
        
    //si los dos tienen un valor distinto de ninguno seleccionado   
    } else {

        if (identificadorDeFiltros == 1) {
            //dasactivo las opciones menos la que tengo seleccionada y ninguno 
            for (let i = 0; i < selectorElegirGenero.options.length; i++) {

                if(selectorElegirGenero.options[i].value == value || selectorElegirGenero.options[i].value == "Ninguno") {
                    selectorElegirGenero.options[i].disabled = false;;
                } else {
                    selectorElegirGenero.options[i].disabled = true;
                }
                
            }
        } else {
            //dasactivo las opciones menos la que tengo seleccionada y ninguno 
            for (let i = 0; i < selectorElegirEstado.options.length; i++) {

                if(selectorElegirEstado.options[i].value == value || selectorElegirEstado.options[i].value == "Ninguno") {
                    selectorElegirEstado.options[i].disabled = false;;
                } else {
                    selectorElegirEstado.options[i].disabled = true;
                } 
            } 
        } 
        
            filtroDoble = true;
            //habilito los botones dinamicos 2
            botonPaginaAnteriorDinamico2.hidden = false;
            botonPaginaSiguienteDinamico2.hidden = false;
            selectorDinamicoDePagina2.hidden = false;

            //deshabilito los botones dinamicos normales
            botonPaginaAnteriorDinamico.hidden = true;
            botonPaginaSiguienteDinamico.hidden = true;
            selectorDinamicoDePagina.hidden = true;
            
            //llamo a la funcion que me permite hacer el segundo filtro
            getSegundoFiltro(identificadorDeFiltros, maxGuardarPersonajesFiltrados2, filtroDoble)    

    }
}

/******************************************************/
export {filtrarSimpson,maxGuardarPersonajesFiltrados2, maxGuardarPersonajesFiltrados}