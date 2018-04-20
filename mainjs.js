
//General object containing our todos
var todoList = {
  todos: [],
  displayTodos: function() {
    var todo = this.todos
    if (!todo.length) {
      console.log("You don't have todos!")
    } else {
        for (var i = 0; i < todo.length; i++) {
          console.log('My todo:', todo[i].todoText)
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
  }
};
