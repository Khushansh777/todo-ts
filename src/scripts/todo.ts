const submitbutton = document.querySelector('.add-button') as HTMLButtonElement;
const submitForm = document.querySelector('#todoInput') as HTMLFormElement;

let value:string;

//function to set local storage
function storeTodo():void{
    localStorage.setItem('todos',JSON.stringify(value));
}
function getToDO(key:string):void{
const value = localStorage.getItem(key) || ''
    if(!value === null){
        const data  = JSON.parse(value);
        return data
    }
    else
    throw new Error('local storage key is not defined')
}
//get value from the form  

function getValueofInput():string{
   value = submitForm.value;
   storeTodo()
   console.log(value);
   return value
}



//render result 





// run function when btn click
submitbutton.addEventListener('click',() =>{
    getValueofInput()
})