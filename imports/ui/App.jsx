import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Todos } from '../api/todos';
import { Meteor } from 'meteor/meteor';

export const App = () => {
  const [text, setText] = useState('');

  const todos = useTracker(() => {
    console.log('Subscribing to todos...');
    Meteor.subscribe('todos');
    const todos = Todos.find({}, { sort: { createdAt: -1 } }).fetch();
    console.log('Current todos:', todos);
    return todos;
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (!text) return;
    console.log('Attempting to insert todo:', text);
    Meteor.call('todos.insert', text, (err, result) => {
      if (err) {
        console.error('Error inserting todo:', err);
      } else {
        console.log('Todo inserted successfully:', result);
        setText('');
      }
    });
  };

  const toggleChecked = todo => {
    console.log('Toggling todo:', todo._id);
    Meteor.call('todos.setChecked', todo._id, !todo.completed, (err) => {
      if (err) console.error('Error toggling todo:', err);
    });
  };

  const deleteTodo = todo => {
    console.log('Deleting todo:', todo._id);
    Meteor.call('todos.remove', todo._id, (err) => {
      if (err) console.error('Error deleting todo:', err);
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type to add new todo"
          style={{ width: '70%', marginRight: 8 }}
        />
        <button type="submit">Add</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo._id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={!!todo.completed}
              onChange={() => toggleChecked(todo)}
              style={{ marginRight: 8 }}
            />
            <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
