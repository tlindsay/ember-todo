import Ember from 'ember';

export default Ember.Controller.extend({
  todos: Ember.computed.alias('model'),
  actions: {
    toggleCompletion(todo) {
      todo.toggleProperty('isCompleted');
      todo.save();
    }
  }
});
