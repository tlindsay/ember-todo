import DS from 'ember-data';

var Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

Todo.reopenClass({
  FIXTURES: [
    {
      id: 1,
      title: 'Learn Ember',
      isCompleted: true
    },
    {
      id: 2,
      title: 'grok partcycle-frontend',
      isCompleted: false
    },
    {
      id: 4,
      title: 'Fuck shit up',
      isCompleted: false
    },
    {
      id: 3,
      title: 'Profit!',
      isCompleted: false
    }
  ]
});

export default Todo;
