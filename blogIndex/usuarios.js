//Creación de usuarios con validación de diferentes campos. 
const peticion = new XMLHttpRequest(); 

//validación de campos
const inputUserName = document.querySelector('#userName');
const inputLastName = document.querySelector('#userLastName');
const inputNick = document.querySelector('#nick');
const form = document.querySelector('#addUsers');
const addButton = document.querySelector("#add");

form.addEventListener('input', function (e) {
    console.log(e.target.id);
    switch (e.target.id) {
        case 'userName':
            console.log("nombre");
            validateName();
            break;
        case 'userLastName':
            console.log("apellido");
            validateLastName();
            break;
        case 'nick':
            console.log("nick");
            validateNick();
            break;
    }
});

addButton.addEventListener('click', function (e){
    e.preventDefault();
    let isNameValid = validateName(),
        isLastNameValid = validateLastName(),
        isNickValid = validateNick();
    let isFormValid = isNameValid && isLastNameValid && isNickValid;
    console.log(isFormValid);
    if(isFormValid){
        console.log("insertando");
        // creo los atributos
        let uName = inputUserName.value + " " + inputLastName.value;
        let nickname = inputNick.value; 
        // creo un usuario con los valores obtenidos del formulario
        let user = {user:uName, nick:nickname} 
        //si es válido se hace el post en users
        peticion.open('POST','http://localhost:3000/users');
        peticion.setRequestHeader('Content-type', 'application/json');
        peticion.send(JSON.stringify(user)); //parseo al usuario
        console.log("enviado");
        peticion.addEventListener('load', function(){
            //cambio el valor del resultado 201 - created post
            if (peticion.status===201) {
                // esto puedo añadir un mensaje en div oculto
                console.log("Usuario añadido.");
            } else{
                muestraError();
            }
        });
    }
});

peticion.addEventListener(' error', muestraError); 
peticion.addEventListener(' abort', muestraError); 
peticion.addEventListener(' timeout', muestraError); 

function muestraError() {
    if (this.status) {
        console.log("Error "+this.status+" ("+this.statusText+") en la petición");
    } else {console.log("Ocurrió un error o se abortó la conexión");} 
}

function validateName() {
    let valid = false;
    const min = 3,
          max = 20;
        console.log(inputUserName);
    const name = inputUserName.value.trim();
    if (!isBetween(name.length, min, max)) {
        alert(`El nombre debe tener entre ${min} y ${max} caracteres.`)
    } else {
        valid = true;
    }
    return valid;
};

function validateLastName(){
    let valid = false;
    const min = 3,
          max = 30;
    const lastName = inputLastName.value.trim();
    if (!isBetween(lastName.length, min, max)) {
        alert(`Los apellidos deben tener entre ${min} y ${max} caracteres.`)
    } else {
        valid = true;
    }
    return valid;
}

function validateNick(){
    let valid = false;
    const min = 3,
          max = 10;
    const nick = inputNick.value.trim();
    if (!isBetween(nick.length, min, max)){
        alert(`El nombre de usuario debe tener entre ${min} y ${max} caracteres.`)
    } else {
        valid = true;
    }
    return valid;
}

function isBetween (length, min, max){
    if (length < min || length > max){
       return false; 
    } else{
        return true;
    }    
};