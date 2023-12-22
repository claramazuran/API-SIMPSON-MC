/***************************************************** */
const contenedorSimpsons = document.getElementById("contenedor-simpson")
const botonPaginaAnterior = document.getElementById("boton-pagina-anterior")
const botonPaginaSiguiente = document.getElementById("boton-siguiente-pagina")
const botonPaginaAnteriorDinamico = document.getElementById("boton-pagina-anterior-dinamico")
const botonPaginaSiguienteDinamico = document.getElementById("boton-siguiente-pagina-dinamico")
const botonPaginaAnteriorDinamico2 = document.getElementById("boton-pagina-anterior-dinamico-2")
const botonPaginaSiguienteDinamico2 = document.getElementById("boton-siguiente-pagina-dinamico-2")

/*Variables aparte*/
//variable que me guarda el objeto que me indica que es la ultima pagina
let guardarUltimaPagina;
//variable que me indica si estoy en la utlima pagina
let estoyEnLaUltimaPagina = false;

/******************GETSIMPSON*************************/
const getSimpson = async (page) => {

    //si el nro de pagina es 1 deshabilito el boton de pagina anterior
    if (page == 1) {
        botonPaginaAnterior.hidden = true
    } else {
        botonPaginaAnterior.hidden = false
    }
    //si el nro de pagina es 65 deshabilito el boton de pagina siguiente
    if (page == 65) {
        botonPaginaSiguiente.hidden = true
    } else {
        botonPaginaSiguiente.hidden = false
    }

    contenedorSimpsons.innerHTML = ``

    try{
        
        const resolve = await fetch(`https://apisimpsons.fly.dev/api/personajes?limit=10&page=${page}`)
        const data = await resolve.json()
        
            data.docs.forEach (personaje => {

                contenedorSimpsons.innerHTML += `
                <div class="book">
                <p>Historia: 
                ${personaje.Historia}</p>
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
    } 
    catch (error) {
        console.log("hubo un error")
        console.error(error)       
    }

}
/******************GETSIMPSON*************************/

/******************GETSIMPSONFILTRADO*************************/
const getSimpsonFiltrado = async (array1, page, filtroDoble) => {
    
    //en este array guardo los personajes que voy a mostrar, pongo page -1 porque sino los indices no me dan, ya que las paginas empiezan desde 1 y el array max empieza desde cero
    let guardarPersonajes = array1[page - 1];

    if (filtroDoble == false) {

        //si el nro de pagina es 1 deshabilito el boton de pagina anterior
        if (page == 1) {
            botonPaginaAnteriorDinamico.hidden = true;
        } else {
            botonPaginaAnteriorDinamico.hidden = false;
        }
        
        //si el nro de pagina es igual a la langitud del array1 significa que estoy en la ultima pagina
        if (page == array1.length){
            estoyEnLaUltimaPagina = true;
            botonPaginaSiguienteDinamico.hidden = true;

            //saca el ultimo elemento del array que seria el objeto que me indica que es la ultima pagina y lo guardo en una variable para volver a colocarlo en el array dsp
            guardarUltimaPagina = guardarPersonajes.pop()  
                    
        } else {
            estoyEnLaUltimaPagina = false;
            botonPaginaSiguienteDinamico.hidden = false;
        }
                
        
    } else {
        //si el nro de pagina es 1 deshabilito el boton de pagina anterior
        if (page == 1) {
            botonPaginaAnteriorDinamico2.hidden = true;
        } else {
            botonPaginaAnteriorDinamico2.hidden = false;
        }
    
        //si el nro de pagina es igual a la langitud del array1 significa que estoy en la ultima pagina
        if (page == array1.length){
            estoyEnLaUltimaPagina = true;
            botonPaginaSiguienteDinamico2.hidden = true;

            //saca el ultimo elemento del array que seria el objeto que me indica que es la ultima pagina y lo guardo en una variable para volver a colocarlo en el array dsp
            guardarUltimaPagina = guardarPersonajes.pop()  
                    
        } else {
            estoyEnLaUltimaPagina = false;
            botonPaginaSiguienteDinamico2.hidden = false;
        }

    }    
    //vacio el contenedor asi no se me acumulan los simpson 
    contenedorSimpsons.innerHTML= ``;
    
    if (estoyEnLaUltimaPagina == false) {

        guardarPersonajes.forEach(personaje => {
            
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
    } else {
        guardarPersonajes.forEach(personaje => {
            
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
        //vuelvo a guardar el objeto que me indica la que es la ultima pagina 
        guardarPersonajes = guardarPersonajes.push(guardarUltimaPagina)

        //pongo esto para asegurarme de que siempre este inicializado en false
        estoyEnLaUltimaPagina = false;
    } 
}
/******************GETSIMPSONFILTRADO*************************/

/***************************************************** */
export {getSimpson, getSimpsonFiltrado}