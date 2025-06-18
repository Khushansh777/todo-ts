const submitbutton = document.querySelector('.add-button') as HTMLButtonElement;
const submitForm = document.querySelector('#todoInput') as HTMLInputElement;
const todoContainer = document.querySelector('#todoList') as HTMLUListElement;


let value:string;
let array:Todo[] = [] 
//to set up protocols ofr todo

interface Todo{
    id:Date
    completed:boolean
    name:string
}
//function to set local storage
function storeTodo(elem:Todo[]):void{
    localStorage.setItem('todos',JSON.stringify(elem));
}
// function to get ToDo
function getToDO(key:string){
const value = localStorage.getItem(key);
// console.log(value,'value from getTodo')
if(value === null){
    return []
}
try{
    const data:Todo[]  = JSON.parse(value);
        console.log(data,'data');
        return data
}    
 catch{
        throw new Error('local storage key is undefined');
      }
}

//get value from the form  
 function getValueofInput():string{
   if(submitForm.value === ''){
    alert('Empty Todo, Please Fill in some value');
   } 
   if(submitForm.value !== ''){
    try{
    value = submitForm.value;
    array.push({
        id:new Date(),
        completed:false,
        name:value
    })
   console.log(array);
   storeTodo(array) 
   console.log(value,'value from getValueofInput');
    }
    catch{
        throw new Error('Something is wrong with either value or global array')
    }
   
 
  
   }
    return value
}


//create TODO

// class creteTodo implements Todo{
//     constructor()
// }



//render result 

function renderToDo():void{
    let html : string = ''
    //removes quotes and store info in a variable
    array = getToDO('todos');
    console.log(array,'data from render todo')
    //run through array to make 
    array.forEach((element:Todo) => {
       
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
            </li>`
    });
    todoContainer.innerHTML  = html;
    resetInput()
}
renderToDo()
//reset input
function resetInput(){
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
todoContainer.addEventListener('click',(e) =>{
    const target  = e.target as HTMLElement


// handles delete Btn
     const deleteBtn = target.closest('.delete-button') as HTMLButtonElement

    if(deleteBtn){
        console.log('deleteBTn',deleteBtn);
        const datasetId = deleteBtn.dataset.deleteBtnId;
        // find the matched item and updates array
        array = array.filter(element => element.id.toString() !== datasetId);
        //store array
        storeTodo(array)
        //re-render TODO
        renderToDo()
        return
    }
// habdles edit button

    const editButton =  target.closest('.edit-button') as HTMLElement;
   
    if(editButton){
// find the matched item and updates array
    const datasetId = editButton.dataset.editBtnId?.toString();
  
    const matched = array.find(element => element.id.toString() === datasetId);
    console.log(matched)
    if(matched){
// get values if there is a matched item
       const todoItem = editButton.closest('.todo-item') as HTMLElement;
            const todoText = todoItem.querySelector('.todo-text') as HTMLElement;
            const inputVal = todoItem.querySelector('.edit-input') as HTMLInputElement;
     
      if(editButton.textContent?.trim() === 'Edit'){
// Save updated TODO and Handles UI accordingly
        
        inputVal.classList.remove('displayNone');
        inputVal.value = matched.name ;
        todoText.classList.add('displayNone');
        editButton.innerText = 'Done';
      }
      else if(editButton.textContent?.trim() === 'Done'){
         matched.name = inputVal.value;
         storeTodo(array);
         renderToDo()
       
    }
    }
    }
})
// run function when btn click
submitbutton.addEventListener('click', () =>{
     getValueofInput();
     renderToDo();
     
     
})
// run when enter is pressed
submitForm.addEventListener('keypress',(e) =>{
    if(e.key === 'Enter'){
        getValueofInput();
        renderToDo() 
    }
})
//show prev ToDos
// window.addEventListener('load',() =>{
//     renderToDo();
// })
window.addEventListener('load', () =>{

    renderToDo()
})
