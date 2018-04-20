
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
