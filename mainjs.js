
//General object containing our todos
var todoList = {
  todos: [],
  addTodo: function(todo) {
    this.todos.push({
      todoText: todo,
      completed: false
    });
  },
  changeTodo: function(position, todo) {
    this.todos[position].todoText = todo;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    //Get number of completed todos
    this.todos.forEach( function(todo){
      if (todo.completed === true) {
        completedTodos++
      }
    });

    this.todos.forEach(function(todo) {
      //Case 1: If everything's true.
      if (totalTodos === completedTodos) {
        todo.completed = false;
      //Case 2: Otherwise make everything true.
      } else {
          todo.completed = true;
        }
    });
  }
};


/* Old version of buttons
//We want to access the Display Todos button
var displayTodosButton = document.getElementById('displayTodosButton')
  //We want to run the displayTodos Method when someone clicks the display todos button
  //Add an event
displayTodosButton.addEventListener('click', function() {
  todoList.displayTodos();
});

//We want to access the Toggle All button
var toggleAllButton = document.getElementById('ToggleAllButton');
  //We want to run the toggleAll Method when someone clicks the toggle all button
  //Ad an event
toggleAllButton.addEventListener('click', function() {
  todoList.toggleAll();
});
*/

//Refactored version of the buttons
var handlers = {
  addTodo: function() {
    var input = document.getElementById('addTodoTextInput');
    //I can not make a var like this document.getElementById('addTodoTextInput').value
    //because it will store ONLY the primitive value, and when try and change that value
    //I will only change the value on the variable not the original value on the HTML
    todoList.addTodo(input.value);
    input.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var position = document.getElementById('changePositon');
    var todoText = document.getElementById('changeTodoText');
    todoList.changeTodo(position.valueAsNumber, todoText.value);
    position.value = '';
    todoText.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPosition = document.getElementById('toggleCompletedPosition');
    todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber);
    toggleCompletedPosition.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
}

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    //this refers to the view object
    //forEach(callback, this) <- in order to make it work
    todoList.todos.forEach( function(todo, i){
      var todoTextWithCompletion = ''
      var todoLi = document.createElement('li');

      if (todo.completed === true) {
        todoTextWithCompletion = '[x] ' + todo.todoText;
      } else {
        todoTextWithCompletion = '[ ] ' + todo.todoText;
      }

      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('a');
    deleteButton.href = '#';
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event){
      //console.log(event.target.parentNode.id); <-- example, this will give us the Id of each li element
      //Get the element that was clicked on.
      var elementClicked = event.target;
      //Check if elementClicked is a delete button.
      if (elementClicked.className === 'deleteButton') {
        // Run handlers.deleteTodo(position).
        // We get the position convertir the Id string into a number
         // Number(elementClicked.parentNode.id)
        handlers.deleteTodo(Number(elementClicked.parentNode.id));
      }
    });
  }
 }

view.setUpEventListeners();
