import logo from "../assets/icons/logo.svg";
import { BiLogoLinkedin, BiLogoFacebook, BiLogoTwitter } from "react-icons/bi";

export default function Footer() {
  return (
    <div className="footer-container">
      <nav>
        <div className="logo-section">
          <img src={logo} alt="stucademy logo" />
        </div>

        <ul className="links-section">
          <li>About</li>
          <li>Testimonials</li>
          <li>Contact</li>
        </ul>

        <div className="button-section">
          <button>+234 (0) 81 482 475 88</button>
        </div>
      </nav>

      <hr />

      <div className="socials-section">
        <div className="socials">
          <div className="icon">
            <BiLogoLinkedin />
          </div>
          <div className="icon">
            <BiLogoFacebook />
          </div>
          <div className="icon">
            <BiLogoTwitter />
          </div>
        </div>

        <div className="copyright">
          &copy; 2023 Stucademy. All rights reserved
        </div>
      </div>
    </div>
  );
}
