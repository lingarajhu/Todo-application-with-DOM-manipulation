const addBtn = document.getElementById("task-btn");
const input = document.getElementById("task-input");
const parent = document.getElementById("todo-parent");

let crt = 0;
let todos = [];

function addTodo(todos) {
  if (input.value.trim() === "") {
    alert("Please add a todo");
    return;
  }

  todos.push({
    todoId: "todo-item-" + crt,
    editId: "edit-" + crt,
    deleteId: "delete-" + crt,
    TodoTextId: "todo-text-" + crt,
    title: input.value,
    checkId: "check-" + crt,
    isEditing: false,
    isCompleted: false,
  });

  crt++;
  renderTodos(todos);
  input.value = "";
}

function deleteItem(id) {
  todos = todos.filter((todo) => todo.todoId !== id);
  renderTodos(todos);
}

function toggleEditItem(id) {
  todos = todos.map((todo) => {
    if (todo.todoId === id) {
      if (todo.isEditing) {
        todo.title = document.getElementById(todo.TodoTextId).value;
      }
      todo.isEditing = !todo.isEditing;
    }

    return todo;
  });
  renderTodos(todos);
}

function checkItem(id) {
  todos = todos.map((todo) => {
    if (todo.todoId === id) {
      todo.isCompleted = !todo.isCompleted;
    }
    return todo;
  });

  renderTodos(todos);
}

function renderTodos(todos) {
  parent.innerHTML = "";
  todos.forEach((todo) => {
    parent.innerHTML += `
      <div id="${
        todo.todoId
      }" class="flex items-center justify-between rounded-lg p-3 bg-gray-700 ">
        <div class="flex items-center gap-3">
          <input 
            type="checkbox"
            id="${todo.checkId}"
            ${todo.isCompleted ? "checked" : ""}
            class="w-4 h-4 bg-gray-700 rounded border-gray-600 focus:ring-1 focus:ring-blue-600 ring-offset-gray-800"
          />
          <input
            type="text"
            id="${todo.TodoTextId}"
            value="${todo.title}"
            ${
              todo.isEditing
                ? 'class="bg-transparent border-none text-white focus:outline-none focus:ring-2 focus:ring-blue-600"'
                : 'class="bg-transparent border-none text-white focus:outline-none" readonly'
            }
          />
        </div>
        <div class="flex items-center gap-2">
          <button id="${todo.editId}" class="bg-${
      todo.isEditing ? "green" : "yellow"
    }-500 hover:bg-${
      todo.isEditing ? "green" : "yellow"
    }-600  font-bold py-1 px-3 rounded-lg transition">
            ${todo.isEditing ? "Save" : "Edit"}
          </button>
          <button id=${
            todo.deleteId
          } class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg transition">
            Delete
          </button>
        </div>
      </div>
    `;
  });

  todos.forEach((todo) => {
    document.getElementById(todo.deleteId).addEventListener("click", () => {
      deleteItem(todo.todoId);
    });

    document.getElementById(todo.editId).addEventListener("click", () => {
      toggleEditItem(todo.todoId);
    });

    if (todo.isEditing) {
      const inputFiled = document.getElementById(todo.TodoTextId);
      inputFiled.focus();
      inputFiled.classList.add(
        "outline-none",
        "ring-blue-600",
        "rounded-md",
        "border-none",
        "p-1"
      );
    }

    document.getElementById(todo.checkId).addEventListener("click", () => {
      checkItem(todo.todoId);
    });

    if (todo.isCompleted) {
      const inputFiled = document.getElementById(todo.TodoTextId);
      inputFiled.classList.add("line-through", "text-gray-500");
    }
  });
}

addBtn.addEventListener("click", () => {
  addTodo(todos);
});
