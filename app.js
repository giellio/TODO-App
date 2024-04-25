const todoForm = document.querySelector('form')
const todoInput = document.getElementById('todo-input')
const todoListUL = document.getElementById('todo-list')

let allTodos = getTodos()
updateTodos()

todoForm.addEventListener('submit', (event) => {
  event.preventDefault()
  addTodo()
});

function addTodo () {
  const todoText = todoInput.value.trim()
  if (todoText !== '') {
      const todo = {
          text: todoText,
          completed: false
      }
      allTodos.push(todo)
      todoInput.value = ''
      updateTodos()
      saveTodos()
  }
}

function updateTodos () {
  todoListUL.innerHTML = ''
  allTodos.forEach((todo, todoIndex) => {
      const element = createTodoElement(todo, todoIndex)
      todoListUL.append(element)
  })
}

function createTodoElement (todo, todoIndex) {
  const li = document.createElement('li')
  li.className = 'todo'
  li.innerHTML = `<input type="checkbox" name="todo${todoIndex}" id="todo${todoIndex}" class="custom-checkbox">
                  <label for="todo${todoIndex}" class="custom-checkbox"><svg fill="var(--secondary-colour)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg></label>
                  <label class="todo-text" for="todo${todoIndex}">${todo.text}</label>
                  <button class="delete-button"><svg xmlns="http://www.w3.org/2000/svg" fill="var(--secondary-text-colour)" height="24" viewBox="0 -960 960 960" width="24">
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg></button>`
  const deleteButton = li.querySelector('.delete-button')
  deleteButton.addEventListener("click", () => {
      deleteTodo(todoIndex)
  })
  const checkbox = li.querySelector("input")
  checkbox.addEventListener("change", () => {
      allTodos[todoIndex].completed = checkbox.checked
      saveTodos()
  })
  checkbox.checked = todo.completed
  return li
}

function deleteTodo (todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex)
  saveTodos()
  updateTodos()
}

function saveTodos () {
  const todosJson = JSON.stringify(allTodos)
  localStorage.setItem("todos", todosJson)
}

function getTodos () {
  const todos = localStorage.getItem("todos") || "[]"
  return JSON.parse(todos)
}