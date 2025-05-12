import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Todos = new Mongo.Collection('todos');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('todos', function todosPublication() {
    return Todos.find();
  });
}

Meteor.methods({
  'todos.insert'(text) {
    check(text, String);
    return Todos.insertAsync({
      text,
      createdAt: new Date(),
      completed: false,
    });
  },

  'todos.remove'(todoId) {
    check(todoId, String);
    Todos.remove(todoId);
  },

  'todos.setChecked'(todoId, setChecked) {
    check(todoId, String);
    check(setChecked, Boolean);
    return Todos.updateAsync(todoId, { $set: { completed: setChecked } });
  },
}); 