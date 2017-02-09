import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  actions: {
    markAsCompleted: function(todo) {
      console.log('component action');
      this.sendAction('toggleCompletion', todo);
    }
  }
});
