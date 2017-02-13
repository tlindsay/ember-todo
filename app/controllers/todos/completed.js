import Ember from 'ember';

export default Ember.Controller.extend({
  todos: Ember.computed.filterBy('model', 'isCompleted', true),
  actions: {
    toggleCompletion(todo) {
      todo.toggleProperty('isCompleted');
      todo.save();
    }
  }
});
