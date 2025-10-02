import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="developer-footer">
      <div className="footer-content">
        <p className="developer-credit">
          Developed by{' '}
          <a 
            href="https://www.linkedin.com/in/mohammed-ashfar-meeran-b4a492311" 
            target="_blank" 
            rel="noopener noreferrer"
            className="developer-link"
          >
            Mohammed Ashfar
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;