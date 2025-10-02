import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsPlusCircleFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

import './AdvancedStyles.css';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id) => {
    const confirmation = window.confirm("Are you sure to delete ?");
    if (!confirmation) {
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/deletepost/${id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        await getPosts();
      } else {
        const errResponse = await response.json();
        throw new Error(errResponse.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Container className="advanced-container mt-5">
        <div className="text-center mb-5">
          <h1 className="advanced-heading mb-4">Your Thoughts Collection</h1>
          <Button className="advanced-btn d-flex align-items-center gap-2 mx-auto">
            <Link
              to={"/create"}
              className="text-decoration-none text-white d-flex align-items-center gap-2"
            >
              <BsPlusCircleFill /> Create New Post
            </Link>
          </Button>
        </div>

        <Row className="mt-4 g-4" sm={1} md={2} lg={3}>
          {isLoading && (
            <Col xs={12}>
              <div className="text-center">
                <div className="advanced-spinner"></div>
                <p className="gradient-text mt-3">Loading your thoughts...</p>
              </div>
            </Col>
          )}

          {!isLoading && posts.length > 0 &&
            posts.map((post, index) => (
              <Col key={post._id}>
                <Card className="advanced-card h-100" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <Card.Title className="gradient-text flex-grow-1 me-3">
                        {post.title}
                      </Card.Title>
                      <div className="d-flex gap-2">
                        <Link to={`/update/${post._id}`}>
                          <AiOutlineEdit
                            className="advanced-icon edit-icon"
                            role="button"
                            title="Edit Post"
                          />
                        </Link>
                        <AiFillDelete
                          className="advanced-icon delete-icon"
                          role="button"
                          onClick={() => deletePost(post._id)}
                          title="Delete Post"
                        />
                      </div>
                    </div>
                    <Card.Text className="flex-grow-1" style={{ 
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: '1.6',
                      fontSize: '0.95rem'
                    }}>
                      {post.description}
                    </Card.Text>
                    
                  </Card.Body>
                </Card>
              </Col>
            ))}
            
          {!isLoading && posts.length === 0 && (
            <Col xs={12}>
              <div className="text-center py-5">
                <div className="mb-4">
                  <span style={{ fontSize: '4rem' }}>📝</span>
                </div>
                <h3 className="gradient-text display-6 mb-3">No Posts Yet</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
                  Start sharing your thoughts by creating your first post!
                </p>
                <Button className="advanced-btn mt-3">
                  <Link to={"/create"} className="text-decoration-none text-white">
                    Create Your First Post
                  </Link>
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default PostList;
