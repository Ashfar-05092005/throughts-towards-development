import { Col } from "react-bootstrap";
import './AdvancedStyles.css';

function LoadingSpinner() {
  return (
    <Col xs={12} className="text-center">
      <div className="advanced-spinner"></div>
      <p className="gradient-text mt-3">Loading amazing content...</p>
    </Col>
  );
}

export default LoadingSpinner;
