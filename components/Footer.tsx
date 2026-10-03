export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer section-dark">
      <span className="footer-text">
        © {currentYear} Atelier Studio
      </span>

      <ul className="footer-links">
        <li>
          <a href="#" className="footer-link">
            Instagram
          </a>
        </li>
        <li>
          <a href="#" className="footer-link">
            Pinterest
          </a>
        </li>
        <li>
          <a href="#" className="footer-link">
            LinkedIn
          </a>
        </li>
      </ul>
    </footer>
  );
}
