//& Global Variables
const apiKey = "6675463e60a208ee1fdbf26f";
const addBtn = document.querySelector("button");
const input = document.querySelector("input");
let todos = [];
const loading = document.querySelector('#loading')

//& AddToDo
async function addToDo(){
    showLoader();
 let res = await fetch("https://todos.routemisr.com/api/v1/todos",{
        method:"POST",
        headers:{  
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: input.value,
            apiKey: apiKey
        })
    })
    let finalRes = await res.json();
    input.value = ""
    getAllToDos();
    console.log(finalRes,"Good")
}

addBtn.addEventListener("click", addToDo);

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addToDo();
    }
});

//& GeT All Todos
async function getAllToDos(){
 const response = await fetch(`https://todos.routemisr.com/api/v1/todos/${apiKey}`);
 let data = await response.json();
 console.log(data);
 todos = data.todos;
 loading.classList.replace("d-flex","d-none");
 displayToDo();
}
getAllToDos()

//& Display
function displayToDo(){
   let cartona = "";

   for( let i=0 ; i<todos.length ; i++){
     cartona += `<div class="alert ${todos[i].completed ? 'alert-success text-decoration-line-through' : 'alert-danger'} d-flex justify-content-between align-items-center">
       <p class="mb-0">${todos[i].title}</p>
       <div>
         <button class=" btn ${todos[i].completed ? 'd-none' : ''}" onclick="markAsComplete('${todos[i]._id}')">&#10004</button>
       <button class="btn" onclick="DeleteToDo('${todos[i]._id}')">&#10005</button>  
       </div>
    </div>`
   } 
   document.getElementById("todos").innerHTML = cartona;
}

//& To mark the ToDo as it's completed
async function markAsComplete(id){
    showLoader();
    console.log("Hello",id)
 const response = await fetch("https://todos.routemisr.com/api/v1/todos",{
        method: "PUT",
        headers:{  
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            todoId: id
        })
    });
    const res = await response.json();
    getAllToDos();
}

//& To Delete the ToDo
async function DeleteToDo(id){
    showLoader();
    console.log("Hello",id)
 const response = await fetch("https://todos.routemisr.com/api/v1/todos",{
        method: "DELETE",
        headers:{  
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            todoId: id
        })
    });
    const res = await response.json();
    getAllToDos();
}

//& Loader
function showLoader(){
    loading.classList.replace("d-none","d-flex");
}