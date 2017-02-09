// controllers/todos.js
import Ember from 'ember';

export default Ember.Controller.extend({
  todos: Ember.computed.alias('model'),
  active: Ember.computed.filterBy('todos', 'isCompleted', false),
  activeCount: Ember.computed.alias('active.length'),
  completed: Ember.computed.filterBy('todos', 'isCompleted', true),
  completedCount: Ember.computed.alias('completed.length'),
  actions: {
    toggleCompletion(todo) {
      console.log('controller action');
      todo.toggleProperty('isCompleted');
      todo.save();
    }
  }
});
