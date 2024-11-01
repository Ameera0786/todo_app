/*******************/
/*** MY TODO APP ***/
/*******************/

let todoList = []
// load todoList from localstorage(Allows to save data)
window.addEventListener('load', () => {
  let inputEl = document.querySelector("#todo-input");
  inputEl.focus();

  // get the todos from localstorage
  let storedTodos = localStorage.getItem("todos")
  // save stored list into todoList
  if (storedTodos != null) {
    todoList = JSON.parse(storedTodos);
  }
  // Add the todos from the todolist to the page
  for (let i = 0; i < todoList.length; i++) {
    makeTodo(todoList[i]);
  }
});

// Get the submit button [.querySelector()]
let buttonEl = document.querySelector("#todo-submit");
/** Add listener to the submit button [.addEventListener()] **/
buttonEl.addEventListener('click', () => {
  getLoadTodo();

});

// If enter button clicked on keyboard, it submits a new item to todo-list
let inputEl = document.querySelector("#todo-input");
inputEl.addEventListener('keypress', (event) => {
  if (event.key == "Enter") {
    getLoadTodo();
  }
})

// Prints out todo items to screen, but not empty one
function getLoadTodo() {
  // Get the value from the input [.querySelector(), .value]
  let inputEl = document.querySelector("#todo-input");
  let todo = inputEl.value;
  // don't add blank todo
  if (todo == "") {
    return;
  }

  inputEl.value = "";
  // store todo in todoList
  todoList.push(todo);
  // Add the todoList to localstorage
  localStorage.setItem("todos", JSON.stringify(todoList));

  makeTodo(todo);
}

// Create a todo div to add to todo-list
function makeTodo(todo) {
  // Get the todo list element from the document [.querySelector()]
  let todoListEl = document.querySelector("#todo-list");

  // Create a new div that will contain the new todo [.createElement()]
  let newtododiv = document.createElement("div");

  // Add the "todo" class so that it's styled properly [.classList.add()]
  newtododiv.classList.add("todo");

  // Add the todo text to the new div we just made [.innerHTML]
  newtododiv.innerHTML = todo;

  // Add the eventListener to the delete button [.children[0], .addEventListener()]
  newtododiv.addEventListener('click', (event) => {
    // Remove todo from screen
    todoListEl.removeChild(event.currentTarget);
    // Remove todo from todolist
    todoList = todoList.filter(item => item !== event.currentTarget.textContent)
    console.log(todoList);

    // Update localstorage
    localStorage.setItem("todos", JSON.stringify(todoList));
  });

  // Add the todo div to the page [.appendChild()]
  todoListEl.appendChild(newtododiv);
}