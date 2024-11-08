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

 //CHATGPT - MAKE IT DRAGGABLE
  // Make the new todo item draggable
  newtododiv.setAttribute("draggable", "true");

  // Handle drag start event to indicate the item being dragged
  newtododiv.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text', todo);  // Store the text of the todo
    setTimeout(() => {
      newtododiv.style.display = "none"; // Hide the dragged item temporarily
    }, 0);
  });

  // Handle drag end event to restore the visibility of the item
  newtododiv.addEventListener('dragend', () => {
    newtododiv.style.display = "block";  // Show the dragged item again
  });

  // Handle the drop event to move the item
  newtododiv.addEventListener('dragover', (event) => {
    event.preventDefault();  // Allow the drop
    newtododiv.style.border = "2px solid #000"; // Optional: Add visual indication while dragging
  });

  newtododiv.addEventListener('dragleave', () => {
    newtododiv.style.border = "";  // Reset border when leaving
  });

  newtododiv.addEventListener('drop', (event) => {
    event.preventDefault();
    const draggedTodoText = event.dataTransfer.getData('text');

    // Find the dragged and dropped todo divs
    let draggedTodoDiv = Array.from(todoListEl.children).find(child => child.innerHTML === draggedTodoText);

    // Swap the items in the DOM
    if (draggedTodoDiv !== newtododiv) {
      const allTodos = Array.from(todoListEl.children);
      const draggedIndex = allTodos.indexOf(draggedTodoDiv);
      const droppedIndex = allTodos.indexOf(newtododiv);

      // Swap items in the todo list array
      [todoList[draggedIndex], todoList[droppedIndex]] = [todoList[droppedIndex], todoList[draggedIndex]];

      // Update localStorage with the new order
      localStorage.setItem("todos", JSON.stringify(todoList));

      // Rearrange the DOM elements
      todoListEl.insertBefore(draggedTodoDiv, newtododiv);
    }

    newtododiv.style.border = ""; // Reset border after drop
  });

  //END CHATGPT

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