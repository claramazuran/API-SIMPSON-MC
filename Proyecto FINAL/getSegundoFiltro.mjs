import { getSimpsonFiltrado } from "./getSimpson.mjs"
/***************************************************** */
const botonPaginaAnteriorDinamico2 = document.getElementById("boton-pagina-anterior-dinamico-2")
const botonPaginaSiguienteDinamico2 = document.getElementById("boton-siguiente-pagina-dinamico-2")
const selectorDinamicoDePagina2 = document.getElementById("selectorDePaginaDinamico2")
const selectorElegirGenero = document.getElementById("elegir-genero")
const selectorElegirEstado = document.getElementById("elegir-estado")
const contenedorSimpsons = document.getElementById("contenedor-simpson")

/*Variables aparte*/ 
//este es un arreglo que nos sirve para el doble filtro
let resultadoDos = [];
//array que me guarda arrays de 10 elementos que equivalen a las paginas, es cuando filtro los personajes y tengo mas de 10, es decir que necesito mas de una pagina
let maxGuardarPersonajesFiltradosDoble = [];
//array que me guarda hasta 10 personajes, representa una pagina
let miniGuardarPersonajesFiltradosDoble = [];
//la verdad que este array (seguro se puede hacer mas eficiente) me sirve como un max2, es una copia de maxdoble
let array2 = []
/*Variables aparte*/ 

const getSegundoFiltro = (identificadorDeFiltros,maxGuardarPersonajesFiltrados2, filtroDoble) => {
    
    /*********************************SEPARADOR DE IF******************************/
    //limpio el selector dinamico 2 de pagina
    selectorDinamicoDePagina2.innerHTML =``

    //este if else lo que me hace es convertir a max2 en un array de elementos y filtrarlo segundo el estado o genero y dsp asignarselo a resultadoDos
    if (identificadorDeFiltros == 1) {
        for(let y = 0; y<maxGuardarPersonajesFiltrados2.length; y++) {

            for (let b = 0; b < maxGuardarPersonajesFiltrados2[y].length; b++) {
                                    
                resultadoDos.push(maxGuardarPersonajesFiltrados2[y][b]);
                                    
            }
        }
        
        //filtro resultadoDos segun el estado
        resultadoDos = resultadoDos.filter(personaje => personaje.Estado == selectorElegirEstado.value)
        
    } else {

        //identificadorDeFiltros es 2 aca
        for(let y = 0; y<maxGuardarPersonajesFiltrados2.length; y++) {

            for (let b = 0; b < maxGuardarPersonajesFiltrados2[y].length; b++) {
                                    
                resultadoDos.push(maxGuardarPersonajesFiltrados2[y][b]);   
            }
        }
        
        //filtro resultadoDos segun el genero
        resultadoDos = resultadoDos.filter(personaje => personaje.Genero == selectorElegirGenero.value)
        
    }
    /*********************************SEPARADOR DE IF******************************/

    /*********************************SEPARADOR DE IF******************************/
    
    if (resultadoDos.length > 0 && resultadoDos.length <= 10) {
        console.log("RESULTADODOS TIENE UNA LONGITUD ENTRE 1 Y 10 " + resultadoDos.length)

        //deshabilito el boton para que puedan cambiar de pagina porque hay una sola
        selectorDinamicoDePagina2.disabled = true;

        //creo la opcion de la pagina 1
        selectorDinamicoDePagina2.innerHTML = `
            <option value="1" selected>1</option>
        `

        //deshablito los botones de cambio de pagina
        botonPaginaAnteriorDinamico2.hidden = true;
        botonPaginaSiguienteDinamico2.hidden = true;

        //guardo los personajes filtrados en el arreglo mini
        for(let j = 0; j< resultadoDos.length; j++) {
            miniGuardarPersonajesFiltradosDoble.push(resultadoDos[j])
        }
        //guardo como un elemento en max el array mini 
        maxGuardarPersonajesFiltradosDoble.push(miniGuardarPersonajesFiltradosDoble)

        miniGuardarPersonajesFiltradosDoble.forEach(personaje => {
            
            contenedorSimpsons.innerHTML += `
            <div class="book">
            <p>Historia: ${personaje.Historia}</p>
            <p>Genero: ${personaje.Genero}</p>
            <p>Estado: ${personaje.Estado}</p>
            <p>Ocupacion: ${personaje.Ocupacion}</p>
            <div class="cover">
                <img src="${personaje.Imagen}" alt="">
                <p>${personaje.Nombre}</p>
            </div>
            </div>
            `
        })
        //vacio el arreglo de mini asi no se me acumulan los personajes
        miniGuardarPersonajesFiltradosDoble = [];

        //elimino del ultimo elemento del array max los lugares vacios
        for(let f = 0; f<10; f++){
            maxGuardarPersonajesFiltradosDoble[maxGuardarPersonajesFiltradosDoble.length - 1] = maxGuardarPersonajesFiltradosDoble[maxGuardarPersonajesFiltradosDoble.length - 1].filter(personaje => personaje != undefined )
        }

        //vacio el arreglo de resultado por las dudas
        for (let index = 0; index < 10; index++) {
            resultadoDos.shift()
        }
        //hago la copia de maxDoble
        array2 = maxGuardarPersonajesFiltradosDoble

        //limpio maxDoble
        maxGuardarPersonajesFiltradosDoble = [];

    //si hay mas de 10 personajes que cumplen con el filtro
    } else if (resultadoDos.length >= 11){
        console.log("RESULTADODOS TIENE UNA LONGITUD MAYOR A 10 " + resultadoDos.length) 
        
        //habilito todos los botones y el selector
        botonPaginaAnteriorDinamico2.hidd1en = false;
        botonPaginaSiguienteDinamico2.hidden = false;
        selectorDinamicoDePagina2.disabled = false;

        while (resultadoDos.length != 0) {

            for (let i = 0; i < 10; i++) {
                miniGuardarPersonajesFiltradosDoble.push(resultadoDos[i])
            } 

            //guardo como un elemento en max el array mini 
            maxGuardarPersonajesFiltradosDoble.push(miniGuardarPersonajesFiltradosDoble);

            //vacio el arreglo de mini asi no se me acumulan los personajes
            miniGuardarPersonajesFiltradosDoble = [];

            //hago esto para indicar en el ultimo elemento del array max que es la ultima pagina, entonces creo un objeto el cual lo voy a colocar dentro del mini array y va a tener una propiedad que me indica que es la ultima pagina
            if (resultadoDos.length <= 10) {
                let objetoQueMeIndicaUltimaPagina = {
                    ultPagina: true,
                };

                maxGuardarPersonajesFiltradosDoble[maxGuardarPersonajesFiltradosDoble.length - 1].push(objetoQueMeIndicaUltimaPagina)
            }

            //elimino los 10 elementos de resultado que acabo de guardar, asi no tengo un bucle infnito y sigo guardando los  siguientes
            for (let p = 0; p<10; p++) {
                resultadoDos.shift()
            }
                                
        }
        
        //elimino del ultimo elemento del array max los lugares vacios
        for(let f = 0; f<10; f++){
            maxGuardarPersonajesFiltradosDoble[maxGuardarPersonajesFiltradosDoble.length - 1] = maxGuardarPersonajesFiltradosDoble[maxGuardarPersonajesFiltradosDoble.length - 1].filter(personaje => personaje != undefined )
        }
                                
        //creo las paginas dinamicas segun cuantos elementos tenga en el arreglo max
        for (let o = 1; o<= maxGuardarPersonajesFiltradosDoble.length;o++) {
            let newOption = new Option(o, o);
                selectorDinamicoDePagina2.append(newOption);
        }
        
        //guardo en array2 a maxdoble para no perderlo
        array2 = maxGuardarPersonajesFiltradosDoble
        //llamo a la primer pagina
        getSimpsonFiltrado(maxGuardarPersonajesFiltradosDoble,parseInt(selectorDinamicoDePagina2.value),filtroDoble);
        //limpio maxDoble
        maxGuardarPersonajesFiltradosDoble = [];
        
    } else if(resultadoDos.length == 0){

        //oculto los botones de cambio de pagina y el selector
        selectorDinamicoDePagina2.hidden = true;
        botonPaginaAnteriorDinamico2.hidden = true;
        botonPaginaSiguienteDinamico2.hidden = true;

        //vacio el contenedor por si me queda algun simpson
        contenedorSimpsons.innerHTML = ``
        
        console.log("RESULTADODOS TIENE UNA LONGITUD DE 0 " + resultadoDos.length) 

        //muestro mensaje de que no hay ningun persdonaje que cumpla con el filtro seleccionado
        contenedorSimpsons.innerHTML = `
            <div>NO HAY PERSONAJES QUE CUMPLAN CON EL FILTRO SELECCIONADO</div>
        `
    }
/*********************************SEPARADOR DE IF******************************/
}

/***************************************************** */
export {getSegundoFiltro, maxGuardarPersonajesFiltradosDoble, array2}