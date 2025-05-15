# Meteor.js Todo Application

A simple Todo application built with Meteor.js, React, and MongoDB. This application demonstrates a full-stack JavaScript application with real-time updates.

## Project Structure

```
todo-app/
├── client/                 # Client-side code
│   └── main.jsx           # Client entry point
├── imports/               # Shared code
│   ├── api/              # API definitions
│   │   └── todos.js      # Todos collection and methods
│   └── ui/               # UI components
│       └── App.jsx       # Main React component
├── server/               # Server-side code
│   └── main.js          # Server entry point
└── package.json          # Project dependencies
```

## Features

- Real-time todo list updates
- Add new todos
- Mark todos as complete/incomplete
- Delete todos
- MongoDB integration
- React-based UI

## Prerequisites

- Node.js (v14 or later)
- Meteor.js
- MongoDB (included with Meteor)

## Installation

1. Install Meteor.js:
```bash
curl https://install.meteor.com/ | sh
```

2. Clone the repository:
```bash
git clone <repository-url>
cd todo-app
```

3. Install dependencies:
```bash
meteor npm install
```

4. Start the application:
```bash
meteor
```

The application will be available at `http://localhost:3000`

## External Mongo

If you want to start the app with an external MongoDB, use this:

```bash
export MONGO_URL="mongodb://myuser:mypassword@mongo.example.com:27017/mydatabase?authSource=admin"
meteor
```

## Technical Details

### Backend (Meteor.js)

- MongoDB collection for todos
- Meteor methods for CRUD operations
- Real-time data synchronization

### Frontend (React)

- React components for UI
- Real-time data subscription
- Simple and responsive design

## API Methods

The application provides the following Meteor methods:

- `todos.insert(text)`: Add a new todo
- `todos.remove(todoId)`: Delete a todo
- `todos.setChecked(todoId, setChecked)`: Toggle todo completion status

## Database Schema

Todo items have the following structure:
```javascript
{
  text: String,          // Todo text
  createdAt: Date,       // Creation timestamp
  completed: Boolean     // Completion status
}
```

## Development

To run the application in development mode:
```bash
meteor
```

## Testing

To run tests:
```bash
meteor test --once --driver-package meteortesting:mocha
```

## Deployment

This application is designed to be deployed to a Kubernetes cluster with:
- Nginx Ingress
- MongoDB instance
- Meteor.js application container

## Notes for LLM Chats

When working with this project in LLM chats, note that:

1. The application uses Meteor.js's built-in real-time capabilities
2. No authentication is implemented (removed for simplicity)
3. The application is ready for Kubernetes deployment
4. MongoDB is used as the database
5. React is used for the frontend
6. The application follows Meteor.js's standard project structure

## Next Steps

1. Implement user authentication
2. Add input validation
3. Add error handling
4. Implement unit tests
5. Set up CI/CD pipeline
6. Configure Kubernetes deployment 