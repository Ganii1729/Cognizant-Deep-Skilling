import React, { useState } from 'react';
import './App.css';

// --- Extracted List Item Components (Demonstrating extracting components with keys) ---

function BookItem({ book }) {
  return (
    <div className="catalog-item book-item">
      <div className="item-badge">⭐ {book.rating}</div>
      <h4>{book.title}</h4>
      <p className="item-meta">By {book.author}</p>
      <span className="item-price">{book.price}</span>
    </div>
  );
}

function BlogItem({ blog }) {
  return (
    <div className="catalog-item blog-item">
      <div className="item-badge">{blog.category}</div>
      <h4>{blog.title}</h4>
      <p className="item-meta">Written by {blog.author}</p>
      <span className="item-duration">⏱️ {blog.readTime}</span>
    </div>
  );
}

function CourseItem({ course }) {
  return (
    <div className="catalog-item course-item">
      <div className="item-badge">{course.level}</div>
      <h4>{course.title}</h4>
      <p className="item-meta">Provider: {course.instructor}</p>
      <span className="item-duration">⌛ {course.duration}</span>
    </div>
  );
}

// --- Main Detail Components ---

function BookDetails({ books }) {
  return (
    <div className="details-container">
      <h3>📚 Recommended Technical Books</h3>
      <p className="section-desc">Looping through books list and rendering extracted BookItem components with unique keys.</p>
      <div className="catalog-grid">
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

function BlogDetails({ blogs }) {
  return (
    <div className="details-container">
      <h3>📰 Trending Developer Blogs</h3>
      <p className="section-desc">Looping through blog list and rendering extracted BlogItem components with unique keys.</p>
      <div className="catalog-grid">
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

function CourseDetails({ courses }) {
  return (
    <div className="details-container">
      <h3>🎓 Specialized Coding Courses</h3>
      <p className="section-desc">Looping through courses list and rendering extracted CourseItem components with unique keys.</p>
      <div className="catalog-grid">
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('books');
  const [showPromo, setShowPromo] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const [docTab, setDocTab] = useState('condRendering');

  // Hardcoded catalog data
  const booksData = [
    { id: 101, title: 'Clean Code', author: 'Robert C. Martin', price: '₹899', rating: 4.8 },
    { id: 102, title: 'The Pragmatic Programmer', author: 'Andy Hunt & Dave Thomas', price: '₹1,199', rating: 4.9 },
    { id: 103, title: "You Don't Know JS", author: 'Kyle Simpson', price: '₹599', rating: 4.7 }
  ];

  const blogsData = [
    { id: 201, title: 'React 19 Concurrent Features', author: 'Sarah Connor', readTime: '5 min read', category: 'React' },
    { id: 202, title: 'Deep Dive into ES6 Maps & Sets', author: 'Alex Rivera', readTime: '8 min read', category: 'ES6' },
    { id: 203, title: 'Mastering CSS Layout Systems', author: 'Emma Stone', readTime: '6 min read', category: 'CSS Layout' }
  ];

  const coursesData = [
    { id: 301, title: 'React 19 Complete Masterclass', instructor: 'TechAcademy', duration: '15 hours', level: 'Advanced' },
    { id: 302, title: 'Fullstack Web Engineer Path', instructor: 'CodeCamp', duration: '45 hours', level: 'Beginner' },
    { id: 303, title: 'Modern JS & ESNext Bootcamp', instructor: 'JSUniv', duration: '12 hours', level: 'Intermediate' }
  ];

  // Technical explanations displayed in UI
  const conceptExplanations = {
    condRendering: {
      title: 'Conditional Rendering Ways',
      text: 'React offers multiple ways to render elements based on state: 1) if/else conditions (helper functions), 2) Element Variables, 3) Ternary operators (? :), 4) Short-circuit logical AND (&&), and 5) Switch-case blocks.'
    },
    multComponents: {
      title: 'Rendering Multiple Components',
      text: 'You can compose large user interfaces by rendering multiple custom components side-by-side or nesting them, passing down state data as props.'
    },
    listKeys: {
      title: 'Lists & Unique Keys',
      text: 'Keys help React identify which list items have changed, been added, or been removed. Keys should be given to elements inside the map() loop to provide a stable identity.'
    },
    extracting: {
      title: 'Extracting Components with Keys',
      text: 'When extracting a list item component (like BookItem from BookDetails), you must declare the "key" attribute directly on the custom component tag inside the map() loop, not inside the child component HTML.'
    },
    reactMap: {
      title: 'JS map() in React',
      text: 'JavaScript .map() method is the standard way to loop through arrays in JSX. It evaluates each index, executes a callback function, and returns a new array of React elements.'
    }
  };

  // --- Conditional Rendering Way 1: Switch-case & Element Variable ---
  let mainContent;
  switch (activeTab) {
    case 'books':
      mainContent = <BookDetails books={booksData} />;
      break;
    case 'blogs':
      mainContent = <BlogDetails blogs={blogsData} />;
      break;
    case 'courses':
      mainContent = <CourseDetails courses={coursesData} />;
      break;
    default:
      mainContent = <div>No items available.</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="nav-bar glass-panel">
          <span className="brand-logo">✍️ DevBlog <span className="logo-accent">Hub</span></span>
          <div className="tab-menu">
            <button
              className={`tab-link ${activeTab === 'books' ? 'active' : ''}`}
              onClick={() => setActiveTab('books')}
            >
              Books
            </button>
            <button
              className={`tab-link ${activeTab === 'blogs' ? 'active' : ''}`}
              onClick={() => setActiveTab('blogs')}
            >
              Blogs
            </button>
            <button
              className={`tab-link ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              Courses
            </button>
          </div>
        </div>

        <div className="hero-banner">
          <h1>Learning Resource Center</h1>
          <p>Explore recommended items, articles, and training materials. Built with React List Mapping and key extraction.</p>
        </div>
      </header>

      <main className="main-content">
        {/* Conditional Rendering Way 2: Logical && short-circuit (Promo alert display) */}
        {showPromo && (
          <div className="promo-alert glass-panel">
            <div className="promo-text">
              <span>🚀 <strong>Special Offer:</strong> Access all expert course syllabus catalogs and book guides for free.</span>
            </div>
            <button className="close-promo-btn" onClick={() => setShowPromo(false)}>✕</button>
          </div>
        )}

        <div className="display-controls">
          <span className="display-label">Active Section: <strong>{activeTab.toUpperCase()}</strong></span>
          {/* Conditional Rendering Way 3: Ternary operator for layout selector buttons */}
          <div className="layout-toggle">
            <button 
              className={`layout-btn ${isGridView ? 'active' : ''}`} 
              onClick={() => setIsGridView(true)}
            >
              Grid View
            </button>
            <button 
              className={`layout-btn ${!isGridView ? 'active' : ''}`} 
              onClick={() => setIsGridView(false)}
            >
              List View
            </button>
          </div>
        </div>

        <div className="content-layout">
          {/* Left Area: Dynamically Rendered Components (Element variable) */}
          <div className={`catalog-wrapper ${isGridView ? 'grid-layout' : 'list-layout'}`}>
            {mainContent}
          </div>

          {/* Right Area: Interactive Concepts Panel */}
          <div className="right-panel">
            <div className="glass-panel concepts-card">
              <h3>Blogger App Architecture</h3>
              <p className="panel-desc">Interactive reference explaining key list-mapping and rendering objectives:</p>
              
              <div className="vertical-tabs">
                {Object.keys(conceptExplanations).map((key) => (
                  <button
                    key={key}
                    className={`vertical-tab-link ${docTab === key ? 'active' : ''}`}
                    onClick={() => setDocTab(key)}
                  >
                    {conceptExplanations[key].title}
                  </button>
                ))}
              </div>

              <div className="vertical-tab-body">
                <h4>{conceptExplanations[docTab].title}</h4>
                <p>{conceptExplanations[docTab].text}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 DevBlog Hub • List Mapping & Key Extraction Lab 13</p>
      </footer>
    </div>
  );
}

export default App;
