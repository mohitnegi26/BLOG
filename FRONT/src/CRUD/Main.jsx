import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // <-- Add this
import { Modal } from 'bootstrap'; // ✅ Required to avoid undefined error



const Main = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/getblog');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        alert('Post created successfully!');
        setTitle('');
        setContent('');
        fetchPosts();
        const modalEl = document.getElementById('createPostModal');
        const modal = window.bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      } else {
        alert('Failed to create post.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

 const openEditModal = (post) => {
  setEditId(post._id);
  setEditTitle(post.title);
  setEditContent(post.content);

  const modalEl = document.getElementById('editPostModal');
  if (modalEl) {
    const modal = new Modal(modalEl); // ✅ use imported Modal
    modal.show();
  }
};


 const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`http://localhost:5000/api/updateblogbyid/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });

    if (res.ok) {
      alert('Post updated!');
      fetchPosts();

      const modalEl = document.getElementById('editPostModal');
      if (modalEl) {
        const modal = Modal.getInstance(modalEl) || new Modal(modalEl); // ✅
        modal.hide();
      }
    } else {
      alert('Update failed');
    }
  } catch (err) {
    console.error('Error updating:', err);
  }
};

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/deleteblog/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Post deleted!');
        fetchPosts();
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  return (
    <div className="blog-app d-flex flex-column min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h1 className="navbar-brand fw-bold">📝 Blog Management</h1>
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#createPostModal"
          >
            + Create New Blog
          </button>
        </div>
      </nav>

      {/* Blog Posts List */}
      <main className="container my-5 flex-grow-1">
        <h2 className="text-center mb-4">All Blog Posts</h2>
        {posts.length === 0 ? (
          <p className="text-muted text-center">No posts available.</p>
        ) : (
          <div className="row">
            {posts.map((post) => (
              <div key={post._id} className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body background">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content}</p>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <button className="btn btn-sm btn-warning" onClick={() => openEditModal(post)}>
                        ✏️ Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(post._id)}>
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        © 2025 Blog Management System. All rights reserved.
      </footer>

      {/* Create Post Modal */}
      <div
        className="modal fade"
        id="createPostModal"
        aria-labelledby="createPostModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="createPostModalLabel">
                  Create New Post
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    rows="6"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post here..."
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Save Post
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Edit Post Modal */}
      <div
        className="modal fade"
        id="editPostModal"
        aria-labelledby="editPostModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleUpdate}>
              <div className="modal-header">
                <h5 className="modal-title" id="editPostModalLabel">
                  Edit Post
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    rows="6"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  Update Post
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
