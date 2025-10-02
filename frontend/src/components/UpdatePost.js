import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link, useParams, useNavigate } from "react-router-dom";
import './AdvancedStyles.css';

function UpdatePost() {
  const { postid } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill in both fields");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/updatepost/${postid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description }),
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        alert("Failed to update post");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getSinglePost = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/post/${postid}`
        );
        const data = await response.json();
        setTitle(data.post?.title || "");
        setDescription(data.post?.description || "");
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    getSinglePost();
  }, [postid]);

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={10} md={8} lg={6} xl={5}>
          <div className="advanced-form-container floating">
            <h1 className="advanced-heading">Update Your Post</h1>
            
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-4">
                <Form.Label className="advanced-label">✨ Title of your thoughts</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your creative title..."
                  className="advanced-input"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="advanced-label">📝 Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Share your thoughts and ideas..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="advanced-input"
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center" style={{ marginTop: "40px" }}>
                <Button className="btn-advanced-danger">
                  <Link to={"/"} className="text-decoration-none text-white d-flex align-items-center gap-2">
                    <span>❌</span> Cancel
                  </Link>
                </Button>

                {!loading && (
                  <Button type="submit" className="advanced-btn d-flex align-items-center gap-2">
                    <span>✏️</span> Update Post
                  </Button>
                )}

                {loading && (
                  <Button className="btn-advanced-primary" disabled>
                    <div className="d-flex align-items-center gap-2">
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span>Updating...</span>
                    </div>
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default UpdatePost;