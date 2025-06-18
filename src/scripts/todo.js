var submitbutton = document.querySelector('.add-button');
var submitForm = document.querySelector('#todoInput');
var todoContainer = document.querySelector('#todoList');
var deleteBtn = document.querySelectorAll('.delete-button');
var value;
var array = [];
//function to set local storage
function storeTodo() {
    localStorage.setItem('todos', JSON.stringify(array));
}
// function to get ToDo
function getToDO(key) {
    var value = localStorage.getItem(key);
    // console.log(value,'value from getTodo')
    if (value === null) {
        return [];
    }
    try {
        var data = JSON.parse(value);
        console.log(data, 'data');
        return data;
    }
    catch (_a) {
        throw new Error('local storage key is undefined');
    }
}
//get value from the form  
function getValueofInput() {
    if (submitForm.value === '') {
        alert('Empty Todo, Please Fill in some value');
    }
    if (submitForm.value !== '') {
        try {
            value = submitForm.value;
            array.push({
                id: new Date(),
                completed: false,
                name: value
            });
            console.log(array);
            storeTodo();
            console.log(value, 'value from getValueofInput');
        }
        catch (_a) {
            throw new Error('Something is wrong with either value or global array');
        }
    }
    return value;
}
//create TODO
// class creteTodo implements Todo{
//     constructor()
// }
//render result 
function renderToDo() {
    var html = '';
    //removes quotes and store info in a variable
    array = getToDO('todos');
    console.log(array, 'data from render todo');
    //run through array to make 
    array.forEach(function (element) {
        html += "<li class=\"todo-item\">\n                <input type=\"checkbox\" class=\"todo-checkbox\">\n                <span class=\"todo-text\">".concat(element.name, "</span>\n                <div class=\"todo-actions\">\n                    <button class=\"edit-button\">\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                            <path d=\"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"></path>\n                            <path d=\"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z\"></path>\n                        </svg>\n                        Edit\n                    </button>\n                    <button class=\"delete-button\" delete-btn-id = '").concat(element.id, "'>\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                            <path d=\"M3 6h18\"></path>\n                            <path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path>\n                        </svg>\n                        Delete\n                    </button>\n                </div>\n            </li>");
    });
    todoContainer.innerHTML = html;
    resetInput();
}
renderToDo();
//reset input
function resetInput() {
    submitForm.value = '';
}
// Delete Btn functionality
deleteBtn.forEach(function (button) {
    button.addEventListener('click', function () {
        var buttonId = button.dataset.deleteBtnId;
        var data = getToDO('todos');
        var filteredData = data.filter(function (specificData) { return specificData.id !== buttonId; });
        localStorage.setItem('todos', JSON.stringify(filteredData));
        renderToDo();
    });
});
// run function when btn click
submitbutton.addEventListener('click', function () {
    getValueofInput();
    renderToDo();
});
// run when enter is pressed
submitForm.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getValueofInput();
        renderToDo();
    }
});
//show prev ToDos
// window.addEventListener('load',() =>{
//     renderToDo();
// })
window.addEventListener('load', function () {
    renderToDo();
});
