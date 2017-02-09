import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    let todos = this.store.findAll('todo');
    console.log(todos.get('length'));
    return todos;
  }
});
