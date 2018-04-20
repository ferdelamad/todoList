
//General object containing our todos
var todoList = {
  todos: [],
  displayTodos: function() {
    var todo = this.todos
    if (!todo.length) {
      console.log("You Todos list is empty!")
    } else {
        console.log('My Todos:');
        for (var i = 0; i < todo.length; i++)   {
          if (todo[i].completed === true) {
            console.log('(x)', todo[i].todoText);
          } else {
            console.log('( )', todo[i].todoText);
          }
        }
      }
  },
  addTodo: function(todo) {
    this.todos.push({
      todoText: todo,
      completed: false
    });
    this.displayTodos();
  },
  changeTodo: function(position, todo) {
    this.todos[position].todoText = todo;
    this.displayTodos();
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    this.displayTodos();
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    //Get number of completed todos
    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    //Case 1: If everything's true.
    if (totalTodos === completedTodos) {
      //make everything false.
      this.todos.forEach(function(todo) {
        todo.completed = false;
      });
      //Case 2: Otherwise make everything true.
    } else {
        this.todos.forEach(function(todo) {
          todo.completed = true;
        });
    }
    this.displayTodos();
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
  displayTodos: function() {
    todoList.displayTodos()
  },
  addTodo: function() {
    var input = document.getElementById('addTodoTextInput');
    //I can not make a var like this document.getElementById('addTodoTextInput').value
    //because it will store ONLY the primitive value, and when try and change that value
    //I will only change the value on the variable not the original value on the HTML
    todoList.addTodo(input.value);
    input.value = '';
  },
  changeTodo: function() {
    var position = document.getElementById('changePositon');
    var todoText = document.getElementById('changeTodoText');
    todoList.changeTodo(position.valueAsNumber, todoText.value);
    position.value = '';
    todoText.value = '';
  },
  deleteTodo: function() {
    var positionToDelete = document.getElementById('positionToDelete');
    todoList.deleteTodo(positionToDelete.valueAsNumber);
    positionToDelete.value = '';
  },
  toggleCompleted: function() {
    var toggleCompletedPosition = document.getElementById('toggleCompletedPosition');
    todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber);
    toggleCompletedPosition.value = '';
  },
  toggleAll: function() {
    todoList.toggleAll();
  }
}
