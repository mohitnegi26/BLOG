
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
  return (
    <div className="blog-app d-flex flex-column min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3">
        <div className="container-fluid">
          <h1 className="navbar-brand fw-bold text-center">📝 Blog Management</h1>
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#createPostModal"
          >
            + Create New Post
          </button>
        </div>
      </nav>

      {/* Main content placeholder */}
      <main className="container my-5 flex-grow-1">
        <p className="text-muted text-center">Your posts will be displayed here after integration.</p>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        © 2025 Blog Management System. All rights reserved.
      </footer>

      {/* Create Post Modal */}
      <div
        className="modal fade"
        id="createPostModal"
        // tabIndex="-1"
        aria-labelledby="createPostModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <form>
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
                    placeholder="Enter post title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    rows="6"
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
    </div>
  );
};

export default Main;
