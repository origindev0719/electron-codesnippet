# Code Snippet Manager
Code Snippet Manager is a desktop application built using Electron, React, and TypeScript. It allows users to manage and organize their code snippets efficiently. The application provides the following features:

# Features

1. Main Window:

Display a list of code snippets.
Create new snippets, edit existing snippets, and delete snippets.
Implement search functionality to search for snippets by title or description.

2. Code Snippet Entry:

Each snippet has a title, description, and the code snippet itself.
Syntax highlighting for the code snippets based on their language using react-ace and AceEditor component.

3. Persistence and Storage:

The application persists code snippets using LocalStorage mechanism.

# Installation

Install the dependencies by running:

npm install

# Usage

To start the application, use the following command:

npm start

# Technologies Used

- Electron: For creating the desktop application framework.
- React: For building UI components and managing the application state.
- TypeScript: For adding static typing to the codebase.
- react-ace: A code editor component for React, used for syntax highlighting.
- AceEditor: A code editor component for syntax highlighting based on the language.
- LocalStorage: Used as a mechanism for persisting code snippets locally.

# Additional Information

- The react-ace library is used to integrate AceEditor into the application. It provides a rich code editing experience with syntax highlighting.
- The AceEditor component is used to render the code snippets and apply syntax highlighting based on the selected language.
- LocalStorage is used to store code snippets locally on the user's machine. This allows the application to maintain the state even after the user closes and reopens the application.
