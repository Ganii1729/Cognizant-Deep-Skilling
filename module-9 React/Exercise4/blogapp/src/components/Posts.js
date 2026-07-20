import React, { Component } from 'react';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.loadPosts();
  }

  componentDidCatch(error, info) {
    alert("An error occurred in Posts component: " + error.toString());
    this.setState({ error: error.toString() });
  }

  loadPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Fetch first 12 posts for a clean grid layout
        this.setState({
          posts: data.slice(0, 12),
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          error: error.message,
          loading: false
        });
        alert("Failed to load posts: " + error.message);
      });
  }

  render() {
    const { posts, loading, error } = this.state;

    if (error) {
      return (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Something went wrong</h2>
          <p className="error-msg">{error}</p>
          <button className="retry-btn" onClick={() => {
            this.setState({ loading: true, error: null });
            this.loadPosts();
          }}>
            Retry Loading
          </button>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Fetching posts from API...</p>
        </div>
      );
    }

    return (
      <div className="posts-section">
        <div className="section-header">
          <h2>Latest Feed</h2>
          <span className="badge">{posts.length} posts loaded</span>
        </div>
        <div className="posts-grid">
          {posts.map(post => (
            <article key={post.id} className="post-card">
              <span className="post-meta">Post #{post.id}</span>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }
}

export default Posts;
