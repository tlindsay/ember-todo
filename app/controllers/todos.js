// controllers/todos.js
import Ember from 'ember';

export default Ember.Controller.extend({
  todos: Ember.computed.alias('model'),
  active: Ember.computed.filterBy('todos', 'isCompleted', false),
  activeCount: Ember.computed.alias('active.length'),
  completed: Ember.computed.filterBy('todos', 'isCompleted', true),
  completedCount: Ember.computed.alias('completed.length'),
  newTodo: '',
  actions: {
    toggleCompletion(todo) {
      console.log('controller action');
      todo.toggleProperty('isCompleted');
      todo.save();
    },
    createTodo(text) {
      let todo = this.store.createRecord('todo', {
        title: text.trim(),
        isCompleted: false
      });
      todo.save();
      this.set('newTodo', '');
    },
    destroyCompletedTodos() {
      console.log('Destroy Completed');
      let todos = this.get('completed');
      todos.map(function(t) {
        t.destroyRecord();
      });
    }
  }
});
