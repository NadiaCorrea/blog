/*Vamos a crear un pequeño blog que permita comentarios, 
para ello tendremos que crear un servidor con json-server con las “tablas” users, posts y comments. 
Crearemos las siguientes páginas: 
● Creación de usuarios con validación de diferentes campos. 
● Lista de posts con título y autor. 
● Post con título, contenido y autor. Además se mostrarán los comentarios y nos permitirá añadir nuevos comentarios, 
pudiendo seleccionar el autor como queramos. 
● EXTRA: página para añadir nuevos post, permitirá seleccionar el autor mediante un campo select.
*/

const list = document.getElementById("postList");
const peticion = new XMLHttpRequest(); 

//Creación de usuarios con validación de diferentes campos. 

// "id":1,
//       "user":"Nadia Correa",
//       "nick":"Nashiacm"
const addButton = document.getElementById("addUsers");

addButton.addEventListener('click', function (){
    let divOculto = document.getElementById("outputUsers");
    divOculto.style.display = "block";
});






//Lista de posts con título y autor. 

peticion.open('GET', 'http://localhost:3000/posts');
// console.log("entra");
peticion.send(); 

peticion.addEventListener('load', function() {
    // console.log("entra1");
    if (peticion.status===200) {
        let postsJ=JSON.parse(peticion.responseText);

        for (post of postsJ){
            // console.log("entra3");
            let newList = document.createElement("li");
            let iPost = document.createTextNode("Título: " + post.title + " Autor: " + post.author);
            newList.appendChild(iPost);
            newList.id= "post_" + post.id;
            list.appendChild(newList);
        }

    } else {
        muestraError();
    } 
});

// Post con título, contenido y autor. Además se mostrarán los comentarios y nos permitirá añadir nuevos comentarios, 
// pudiendo seleccionar el autor como queramos. 







peticion.addEventListener(' error', muestraError); 
peticion.addEventListener(' abort', muestraError); 
peticion.addEventListener(' timeout', muestraError); 

function muestraError() {
    if (this.status) {
        console.log("Error "+this.status+" ("+this.statusText+") en la petición");
    } else {console.log("Ocurrió un error o se abortó la conexión");} 
}