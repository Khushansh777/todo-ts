var submitbutton = document.querySelector('.add-button');
var submitForm = document.querySelector('#todoInput');
var value;
//function to set local storage
function storeTodo() {
    localStorage.setItem('todos', JSON.stringify(value));
}
function getToDO(key) {
    var value = localStorage.getItem(key) || '';
    if (!value === null) {
        var data = JSON.parse(value);
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
submitbutton.addEventListener('click', function () {
    getValueofInput();
});
