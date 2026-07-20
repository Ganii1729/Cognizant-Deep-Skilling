# Exercise 10: JSX & ES6 Concepts in React

This folder contains a React application, **officespacerentalapp**, designed to demonstrate and document key React concepts including JSX, ECMA Script (ES6+), `React.createElement()`, DOM rendering, JavaScript expression embedding, and conditional inline styling.

---

## 📚 Concepts Guide & Laboratory Objectives

### 1. What is JSX?
**JSX** stands for **JavaScript XML**. It is a syntax extension to JavaScript, recommended by React for describing what the UI should look like. 
- It looks like HTML but is fully compiled into JavaScript.
- Browsers cannot read JSX directly. It is transpiled (usually using Babel) into browser-compatible JavaScript objects.
- It combines structure (like HTML) with programming logic (JavaScript) inside a single file, promoting component-based modularity.

```jsx
// JSX Code:
const element = <h1 className="heading">Hello World!</h1>;
```

---

### 2. What is ECMA Script?
**ECMAScript** (often abbreviated as **ES**) is the scripting language specification standardized by Ecma International. JavaScript is the most popular implementation of this standard.
- Key versions like **ES6 (ECMAScript 2015)** introduced massive improvements including arrow functions, classes, template literals, let/const block scope, destructuring, promises, and modules.
- React relies heavily on modern ECMAScript features for writing clean, readable, and componentized code.

---

### 3. What is `React.createElement()`?
Every time you write JSX, Babel compiles it under the hood into a call to `React.createElement()`.
`React.createElement()` is the native React method that creates and returns a virtual representation of a DOM element (a React Element).

**Syntax:**
```javascript
React.createElement(type, [props], [...children])
```

- **type**: The element name (e.g., `'div'`, `'h1'`) or a React component name.
- **props**: An object containing attributes/properties passed to the element (e.g., `{ className: 'header' }`).
- **children**: The inner contents of the element (text, other elements, etc.).

**Comparison Example:**
```jsx
// 1. Using JSX (Highly readable)
const elementJSX = <h1 className="title">Office Rental</h1>;

// 2. Transpiled JavaScript equivalent
const elementReact = React.createElement('h1', { className: 'title' }, 'Office Rental');
```

---

### 4. How to Create React Nodes with JSX
React nodes are created using XML-like syntax tags. Tags can contain nested elements, dynamic variables, and custom component components.
- Standard HTML tags start with a lowercase letter (e.g., `<div>`, `<span>`).
- Custom React components must start with an uppercase letter (e.g., `<OfficeList />`).
- All tags must be properly closed. Self-closing tags require a trailing slash (e.g., `<img src="..." />`).

---

### 5. How to Render JSX to the DOM
To display the JSX elements on a web page, they must be rendered into the real DOM using the `react-dom/client` library's `createRoot` and `render` methods (in React 18+).

**Example:**
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Find the target container in index.html
const container = document.getElementById('root');

// Create the virtual DOM root
const root = ReactDOM.createRoot(container);

// Render the application node into the DOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

### 6. How to Use JavaScript Expressions in JSX
JSX allows you to embed *any* valid JavaScript expression inside curly braces `{}`. This enables dynamic rendering of data.
- **Expressions** are code snippets that evaluate to a value (e.g., variable values, operations, ternary operators, function calls).
- Statements (like `if` or `for` loops) are *not* expressions, so they cannot be placed directly inside curly braces. Instead, we use operators like `.map()`, `&&`, or ternary operators `? :`.

**Example:**
```jsx
const user = { firstName: 'Jane', lastName: 'Doe' };
const rent = 55000;

const profile = (
  <div>
    <h2>Welcome, {user.firstName} {user.lastName}!</h2>
    <p>Monthly Rent: ${rent}</p>
    <p>Status: {rent > 60000 ? 'Premium Space' : 'Standard Space'}</p>
  </div>
);
```

---

### 7. How to Use Inline CSS in JSX
In JSX, inline styles are not specified as strings (like in HTML). Instead, they are passed as **JavaScript objects**.
- The style attributes are written in **camelCase** rather than hyphenated (e.g., `backgroundColor` instead of `background-color`).
- Because styles are objects, you use double curly braces: the outer braces `{}` denote a JavaScript expression, and the inner braces `{}` represent the JavaScript object.

**Example:**
```jsx
// Conditional style based on value
const rent = 45000;
const rentStyle = {
  color: rent < 60000 ? 'red' : 'green',
  fontWeight: 'bold',
  fontSize: '18px'
};

const element = <p style={rentStyle}>Rent: {rent} INR</p>;
```

---

## 🚀 Running the officespacerentalapp Project

1. Navigate to the project folder:
   ```bash
   cd officespacerentalapp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm start
   ```
4. Build the application for production:
   ```bash
   npm run build
   ```
