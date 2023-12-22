import { getSimpsonFiltrado } from "./getSimpson.mjs"
/***************************************************** */
const contenedorSimpsons = document.getElementById("contenedor-simpson")
const botonPaginaAnterior = document.getElementById("boton-pagina-anterior")
const botonPaginaSiguiente = document.getElementById("boton-siguiente-pagina")
const selectorDePagina = document.getElementById("elegir-pagina")
const selectorDinamicoDePagina = document.getElementById("selectorDePaginaDinamico")
const botonPaginaAnteriorDinamico = document.getElementById("boton-pagina-anterior-dinamico")
const botonPaginaSiguienteDinamico = document.getElementById("boton-siguiente-pagina-dinamico")

/*Variables aparte*/ 
//variable que me guarda el valor que se coloco en el input pero con todas las letras en minusculas
let guardarValue = null;
//este arreglo me guarda los personajes que busque
let personajesBuscados = [];
//es el arraglo que me guarda los personajes por pagina
let personajesPorPagina = [];
//es el arreglo que me guarda todos los personajes por pagina
let todosLosPersonajes = [];
/*Variables aparte*/ 


const buscarSimpson = async (value, filtroDoble) => {
    //me aseguro de que guardarTodosLosPersonajes este vacio asi no se me acumulan
    todosLosPersonajes = [];
    //paso lo que me colocaron en el input a minusculas por las dudas
    guardarValue = value.toLowerCase();
    
    //vacio el contenedor de los simpson
    contenedorSimpsons.innerHTML = ``

    //limpio el selector dinamico de pagina asi no se me acumulan las paginas
    selectorDinamicoDePagina.innerHTML = ``
    
    
    try {
        const resolve = await fetch(`https://apisimpsons.fly.dev/api/personajes/find/<${guardarValue}>`)
        const data = await resolve.json()

        //guardo el arreglo con los personajes encontrados en el arreglo personajesBuscados
        personajesBuscados = data.result;

        //tengo una sola pagina
        if (personajesBuscados.length > 0 && personajesBuscados.length <= 10) {

            selectorDinamicoDePagina.hidden = false;
            selectorDinamicoDePagina.disabled =true;
            botonPaginaAnteriorDinamico.hidden = true;
            botonPaginaSiguienteDinamico.hidden = true;
                
            //creo la unica opcion de pagina 
            selectorDinamicoDePagina.innerHTML = `
                <option value="1" selected>1</option>
            `
            //guardo al array personajesBuscados en todos los personajes
            todosLosPersonajes.push(personajesBuscados)

            personajesBuscados.forEach(personaje => {
                
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

        //si tengo mas de 10 personajes entonces tengo mas de una sola pagina
        } else if (personajesBuscados.length >= 11) {

            //deshabilito todo lo estatico
            selectorDePagina.hidden =true;
            botonPaginaAnterior.hidden = true;
            botonPaginaSiguiente.hidden = true;
            //habilito lo dinamico
            selectorDinamicoDePagina.hidden = false;
            selectorDinamicoDePagina.disabled = false;
            botonPaginaAnteriorDinamico.hidden = false;
            botonPaginaSiguienteDinamico.hidden = false;

            while (personajesBuscados.length != 0) {

                for (let i = 0; i < 10; i++) {
                    personajesPorPagina.push(personajesBuscados[i])
                } 
                    
                //guardo como un elemento en max el array mini 
                todosLosPersonajes.push(personajesPorPagina);

                //vacio el arreglo de mini asi no se me acumulan los personajes
                personajesPorPagina = [];

                //hago esto para indicar en el ultimo elemento del array max que es la ultima pagina, entonces creo un objeto el cual lo voy a colocar dentro del mini array y va a tener una propiedad que me indica que es la ultima pagina
                if (personajesBuscados.length <= 10) {
                    let objetoQueMeIndicaUltimaPagina = {
                        ultPagina: true,
                    };

                    todosLosPersonajes[todosLosPersonajes.length - 1].push(objetoQueMeIndicaUltimaPagina)
                }

                //elimino los 10 elementos de personajesBuscados que acabo de guardar, asi no tengo un bucle infnito y sigo guardando los  siguientes
                for (let p = 0; p<10; p++) {
                    personajesBuscados.shift()
                }
                    
            }

            //elimino del ultimo elemento del array max los lugares vacios
            for(let f = 0; f<10; f++){
                todosLosPersonajes[todosLosPersonajes.length - 1] = todosLosPersonajes[todosLosPersonajes.length - 1].filter(personaje => personaje != undefined )
            }
                
            //creo las paginas dinamicas segun cuantos elementos tenga en el arreglo max
            for (let o = 1; o<= todosLosPersonajes.length;o++) {
                let newOption = new Option(o, o);
                selectorDinamicoDePagina.append(newOption);
            }
                
            //llamo a la primer pagina
            getSimpsonFiltrado(todosLosPersonajes,parseInt(selectorDinamicoDePagina.value),filtroDoble);

            //no se encontro ningun simpson con el nombre buscado
        } else if (personajesBuscados.length == 0) {

            contenedorSimpsons.innerHTML = `
                <div>NO SE HAN ENCONTRADO PERSONAJES CON EL NOMBRE QUE INGRESO, PORFAVOR INGRESE UN NOMBRE COMPLETO DE UN SIMPSON</div>
            `
        } 
            
    } catch (error) {
        console.log(error)
    }
    
}
/***************************************************** */
export{buscarSimpson, todosLosPersonajes}