"use strict";
const submitbutton = document.querySelector('.add-button');
const submitForm = document.querySelector('#todoInput');
const todoContainer = document.querySelector('#todoList');
let value;
let array = [];
//function to set local storage
function storeTodo(elem) {
    localStorage.setItem('todos', JSON.stringify(elem));
}
// function to get ToDo
function getToDO(key) {
    const value = localStorage.getItem(key);
    // console.log(value,'value from getTodo')
    if (value === null) {
        return [];
    }
    try {
        const data = JSON.parse(value);
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
            storeTodo(array);
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
    let html = '';
    //removes quotes and store info in a variable
    array = getToDO('todos');
    console.log(array, 'data from render todo');
    //run through array to make 
    array.forEach((element) => {
        html += `<li class="todo-item">
                <input type="checkbox" class="todo-checkbox">
                <input type='text' class="edit-input displayNone" value="${element.name}">
                <span class="todo-text">${element.name}</span>
                <div class="todo-actions">
                    <button class="edit-button" data-edit-btn-id="${element.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Edit
                    </button>
                    <button class="delete-button" data-delete-btn-id="${element.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Delete
                    </button>
                </div>
            </li>`;
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
// todoContainer.addEventListener('click', (event) => {
//     const target = event.target as HTMLElement
//     const deleteBtn = target.closest('.delete-button') as HTMLButtonElement
//     if(deleteBtn){
//         console.log('deleteBTn',deleteBtn);
//         const datasetId = deleteBtn.dataset.deleteBtnId;
//         // find the matched item and updates array
//         array = array.filter(element => element.id.toString() !== datasetId);
//         //store array
//         storeTodo(array)
//         //re-render TODO
//         renderToDo()
//     }
//     // const deleteBtnID:number = parseInt(deleteBtn.dataset.id);
//     // console.log(deleteBtnID)
// });
//edit button functionality
todoContainer.addEventListener('click', (e) => {
    var _a, _b, _c;
    const target = e.target;
    // handles delete Btn
    const deleteBtn = target.closest('.delete-button');
    if (deleteBtn) {
        console.log('deleteBTn', deleteBtn);
        const datasetId = deleteBtn.dataset.deleteBtnId;
        // find the matched item and updates array
        array = array.filter(element => element.id.toString() !== datasetId);
        //store array
        storeTodo(array);
        //re-render TODO
        renderToDo();
        return;
    }
    // habdles edit button
    const editButton = target.closest('.edit-button');
    if (editButton) {
        // find the matched item and updates array
        const datasetId = (_a = editButton.dataset.editBtnId) === null || _a === void 0 ? void 0 : _a.toString();
        const matched = array.find(element => element.id.toString() === datasetId);
        console.log(matched);
        if (matched) {
            // get values if there is a matched item
            const todoItem = editButton.closest('.todo-item');
            const todoText = todoItem.querySelector('.todo-text');
            const inputVal = todoItem.querySelector('.edit-input');
            if (((_b = editButton.textContent) === null || _b === void 0 ? void 0 : _b.trim()) === 'Edit') {
                // Save updated TODO and Handles UI accordingly
                inputVal.classList.remove('displayNone');
                inputVal.value = matched.name;
                todoText.classList.add('displayNone');
                editButton.innerText = 'Done';
            }
            else if (((_c = editButton.textContent) === null || _c === void 0 ? void 0 : _c.trim()) === 'Done') {
                matched.name = inputVal.value;
                storeTodo(array);
                renderToDo();
            }
        }
    }
});
// run function when btn click
submitbutton.addEventListener('click', () => {
    getValueofInput();
    renderToDo();
});
// run when enter is pressed
submitForm.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getValueofInput();
        renderToDo();
    }
});
//show prev ToDos
// window.addEventListener('load',() =>{
//     renderToDo();
// })
window.addEventListener('load', () => {
    renderToDo();
});
