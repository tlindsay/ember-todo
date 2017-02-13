import Ember from 'ember';

export default Ember.Controller.extend({
  todos: Ember.computed.filterBy('model', 'isCompleted', false),
  actions: {
    toggleCompletion(todo) {
      todo.toggleProperty('isCompleted');
      todo.save();
    }
  }
});
