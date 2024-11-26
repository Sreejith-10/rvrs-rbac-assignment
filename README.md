# Role Based Access Control Dashboard

## Overview

This project is a web-based admin dashboard designed for managing users, roles, and permissions using Role-Based Access Control (RBAC). The dashboard allows administrators to view and manage users, assign roles to users, define and edit roles, and dynamically assign permissions to these roles. The interface is user-friendly, responsive, and secure, supporting various administrative operations such as CRUD (Create, Read, Update, Delete) for users and roles.

## Features

### 1. **User Management**

- View and manage users.
- Add, edit, or delete users.
- Assign roles to users and toggle their status (Active/Inactive).

### 2. **Role Management**

- Define and edit roles.
- Include permissions (e.g., Read, Write, Delete) or custom attributes for roles.
- Delete roles when no longer needed.

### 3. **Dynamic Permissions**

- Assign or modify permissions for roles.
- View and modify permissions dynamically with a clear and easy-to-use interface.

### 4. **Custom API Simulation**

- Mock API calls for CRUD operations on users and roles.
- Simulate server responses to validate functionality.

### 5. **Sorting & Searching**

- Sort users, roles, and permissions by key fields.
- Search for users and roles by name or other attributes.

### 6. **Notification & Toasts**

- Show notifications to the admin for success, error, or information purposes (e.g., User added, Role updated).

### 7. **Responsiveness**

- The dashboard is fully responsive, providing a seamless experience across different screen sizes and devices.

## Technology used

- `Next Js` :- Next.js is a React framework for building server-side rendered (SSR) web applications. It simplifies routing, data fetching, and static site generation, offering great performance and developer experience out-of-the-box.

- `TypeScript` :- TypeScript is a superset of JavaScript that adds static typing. It helps catch type-related errors at compile time and improves code maintainability with better autocompletion and documentation.

- `Tailwind CSS` :- Tailwind CSS is a utility-first CSS framework that allows you to design custom user interfaces quickly by applying utility classes directly in your markup.
- `React Hook Form` :- React Hook Form is a library for managing form state in React applications. It simplifies form validation and performance by minimizing re-renders.

- `Zod` :- Zod is a TypeScript-first schema validation library. It provides a simple and declarative way to define data validation schemas and ensures type safety.
- `JSON Server` :- JSON Server is a tool to set up a mock REST API with minimal effort. It serves JSON data from a simple file, making it useful for prototyping and testing.

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Steps to Install

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sreejith-10/rvrs-rbac-assignment
   ```
2. Navigate to the project
   ```bash
    cd rvrs-rbac-assignment
   ```
3. Install required packages
   ```bash
   npm install
   ```
4. Run the Next Js app
   ```bash
   npm run dev
   ```
5. Run the mock api server (on a different sever)
   ```bash
   npm run mock-api
   ```

# Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://www.react-hook-form.com/)
- [Zod](https://zod.dev/)
- [JSON Server](https://www.npmjs.com/package/json-server)
