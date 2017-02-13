import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  editing: false,
  doubleClick: function() {
    window.ev = event;
    this.toggleProperty('editing');
    console.log(event);
    console.log(this.$(event.target));
    this.$(event.target).focus();
  },
  actions: {
    markAsCompleted: function(todo) {
      console.log('component action');
      this.sendAction('toggleCompletion', todo);
    },
    saveTodo: function(todo) {
      this.set('editing', false);
      window.todo = todo;
      console.log(todo.get('title'));
      todo.save();
    },
    destroyTodo: function(todo) {
      console.log('Destroying item: ', todo);
      todo.destroyRecord();
    }
  }
});
