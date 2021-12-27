"use strict"
// Entrer dans les maisons

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");


// Ecouter les messages envoyés par le bouton et le todoList
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);


// Créer des nouvelles maisons: ici ce sont des DIV et de LI
function addTodo(event) {
      event.preventDefault();

    //D'abord todoDIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Puis les filles de DIV (des LI): newTodo
    const newTodo = document.createElement('li');
     newTodo.innerText = todoInput.value;
     newTodo.classList.add("todo-item");
     todoDiv.appendChild(newTodo);

    //  Enregistrement de Todos dans le  localStorage
    saveLocalTodos(todoInput.value);

    //  Création de CHECK quand la tache a été faite
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //  Création de poubelle
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Rajout de Div (todoDIV)
    todoList.appendChild(todoDiv);

    // Remise à vide de todoInput
    todoInput.value ="";
}

// Fonction pour effacer les taches 
function deleteCheck(e){
const item = e.target;
if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    // Petite animation sympa
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function(){
        todo.remove();
    })
  }

// Création de toggle quand la tache a été faite ou pas
if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
    }
}

 // Création de mémoire localStorage
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',  JSON.stringify(todos));
}

// Création d'une fonction qui peut demander les informations dans le localStorage
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // Ici c'est la même action de création de maisons mais dans le localStorage (DIV et LI)
    todos.forEach(function(todo){
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Creation LI
    const newTodo = document.createElement('li');
     newTodo.innerText = todo;
     newTodo.classList.add("todo-item");
     todoDiv.appendChild(newTodo);
   
     //  Création de CHECK quand la tache a été faite
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //  Création de poubelle
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

     // Rajout de Div (todoDIV)
    todoList.appendChild(todoDiv);
    });
}

// Création d'une fonction pour effacer les éléments dans le localStorage
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

