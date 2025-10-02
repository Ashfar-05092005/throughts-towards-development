import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './AdvancedStyles.css';

function NotFound() {
  return (
    <Container fluid className="not-found-container">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="text-center">
          <div className="floating">
            <div className="not-found-number">404</div>
            <h2 className="gradient-text mb-4">Oops! Page Not Found</h2>
            <p className="not-found-text mb-5">
              The page you're looking for seems to have wandered off into the digital void. 
              Don't worry, even the best explorers sometimes take a wrong turn!
            </p>
            
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              <Button className="advanced-btn">
                <Link to="/" className="text-decoration-none text-white d-flex align-items-center gap-2">
                  <span>🏠</span> Back to Home
                </Link>
              </Button>
              
              <Button className="btn-advanced-primary">
                <Link to="/create" className="text-decoration-none text-white d-flex align-items-center gap-2">
                  <span>✨</span> Create New Post
                </Link>
              </Button>
            </div>
            
            <div className="mt-5">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌟</div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
                "Not all who wander are lost, but this page definitely is!"
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
