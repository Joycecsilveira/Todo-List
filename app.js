// Seletores DOM

const todoInput = document.querySelector('.todo-input')

const todoButton = document.querySelector('.todo-button')

const todoList = document.querySelector('.todo-list')

const filterOption = document.querySelector('.filter-todo')

//Eventos de excutos - EventListener
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteAndCheck)
filterOption.addEventListener('click', filterTodo)

// Funções
function addTodo(event) {
  event.preventDefault()

  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')

  const todoLi = document.createElement('li')
  todoLi.classList.add('todo-list')
  todoLi.innerText = todoInput.value
  todoDiv.appendChild(todoLi)

  const completedButton = document.createElement('button')
  completedButton.innerHTML = '<i class="fas fa-check"></i>'
  completedButton.classList.add('completed-btn')
  todoDiv.appendChild(completedButton)

  saveLocalTodos(todoInput.value)

  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  trashButton.classList.add('trash-btn')
  todoDiv.appendChild(trashButton)

  todoList.appendChild(todoDiv)

  todoInput.value = ''
}

function deleteAndCheck(e) {
  console.log(e.target)

  const item = e.target
  const todo = item.parentElement

  if (item.classList[0] === 'trash-btn') {
    todo.classList.add('fall')
    removeLocalStorage(todo)
    todo.addEventListener('transitioned', () => {
      todo.remove()
    })
  }

  if (item.classList[0] === 'completed-btn') {
    todo.classList.toggle('completed')
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes
  console.log(todos)

  todos.forEach(todo => {
    switch (event.target.value) {
      case 'all':
        todo.style.display = 'flex'
        break
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
      case 'uncompleted':
        if (!todo.classList.contains('uncompleted')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
    }
  })
}

function saveLocalTodos(todo) {
  let todos

  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}
function getTodos() {
  let todos

  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    const todoLi = document.createElement('li')
    todoLi.classList.add('todo-list')
    todoLi.innerText = todo
    todoDiv.appendChild(todoLi)

    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('completed-btn')
    todoDiv.appendChild(completedButton)

    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)
  })
}
