"use strict";
const submitbutton = document.querySelector('.add-button');
const submitForm = document.querySelector('#todoInput');
let value;
//function to set local storage
function storeTodo() {
    localStorage.setItem('todos', JSON.stringify(value));
}
function getToDO(key) {
    const value = localStorage.getItem(key) || '';
    if (!value === null) {
        const data = JSON.parse(value);
        return data;
    }
    else
        throw new Error('local storage key is not defined');
}
//get value from the form  
function getValueofInput() {
    value = submitForm.value;
    storeTodo();
    console.log(value);
    return value;
}
//render result 
// run function when btn click
submitbutton.addEventListener('click', () => {
    getValueofInput();
});
