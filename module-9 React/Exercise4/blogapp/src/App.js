import React, { Component } from 'react';
import Posts from './components/Posts';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="blog-app">
        <header className="blog-header">
          <div className="header-container">
            <h1 className="logo">Tech<span>Blog</span></h1>
            <nav className="nav-links">
              <a href="#feed" className="active">Feed</a>
              <a href="#about">About</a>
            </nav>
          </div>
        </header>
        
        <main className="blog-main" id="feed">
          <Posts />
        </main>
        
        <footer className="blog-footer">
          <p>© 2026 TechBlog Application. Powered by React & JSONPlaceholder API.</p>
        </footer>
      </div>
    );
  }
}

export default App;
