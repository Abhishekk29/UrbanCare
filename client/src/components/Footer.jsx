import './Footer.css';
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>About us</li>
            <li>Investor Relations</li>
            <li>Terms & conditions</li>
            <li>Privacy policy</li>
            <li>Anti-discrimination policy</li>
            <li>ESG Impact</li>
            <li>Careers</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>For customers</h4>
          <ul>
            <li>UC reviews</li>
            <li>Categories near you</li>
            <li>Contact us</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>For professionals</h4>
          <ul>
            <li>Register as a professional</li>
          </ul>
        </div>

        <div className="footer-col social">
          <h4>Social links</h4>
          <div className="icons">
            <Twitter />
            <Facebook />
            <Instagram />
            <Linkedin />
          </div>
          <div className="store-buttons">
            <img src="/app-store.svg" alt="App Store" /><br></br>
            <img src="/GetItOnGooglePlay.png" alt="Google Play" />
          </div>
        </div>
    </div>
    <div className="footer-bottom">
        <p>* As on July, 2025</p>
        <p>© Copyright 2025 Urban Care. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;