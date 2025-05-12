import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Todos } from '../api/todos';

export const Todo = ({ todo }) => {
  const toggleChecked = () => {
    Meteor.call('todos.setChecked', todo._id, !todo.completed);
  };

  const deleteTodo = () => {
    Meteor.call('todos.remove', todo._id);
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        readOnly
        checked={todo.completed}
        onClick={toggleChecked}
      />
      <span className="text" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button className="delete" onClick={deleteTodo}>
        &times;
      </button>
    </li>
  );
}; 