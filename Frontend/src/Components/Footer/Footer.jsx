import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Logo + About */}
        <div className="footer-col">
          <h2>Move<span>Xp</span>ress</h2>
          <p>
            Safe and reliable movers & packers service. We make your shifting easy and stress-free.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h3>Services</h3>
          <ul>
            <li>House Shifting</li>
            <li>Office Relocation</li>
            <li>Car Transport</li>
            <li>Packing & Unpacking</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h3>Contact</h3>
          <ul>
            <li>📍 Indore, India</li>
            <li><a href="tel:+919876543210">📞 +91 9876543210</a></li>
            <li><a href="mailto:support@movexpress.com">✉️ support@movexpress.com</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 MoveXpress. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;