const submitbutton = document.querySelector('.add-button') as HTMLButtonElement;
const submitForm = document.querySelector('#todoInput') as HTMLFormElement;
const todoContainer = document.querySelector('#todoList') as HTMLUListElement
let value:string;
let array:Todo[] = [] 
//to set up protocols ofr todo

interface Todo{
    id:Date
    completed:boolean
    name:string
}
//function to set local storage
function storeTodo():void{
    localStorage.setItem('todos',JSON.stringify(array));
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
   storeTodo() 
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
                <span class="todo-text">${element.name}</span>
                <div class="todo-actions">
                    <button class="edit-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Edit
                    </button>
                    <button class="delete-button">
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
