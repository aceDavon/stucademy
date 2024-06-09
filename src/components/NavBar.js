import "../styles/navbar.scss";
import logo from "../assets/icons/logo.svg";
import { FcMenu } from "react-icons/fc";
import { LiaTimesSolid } from "react-icons/lia";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
    const [switchMenu, setSwitchMenu] = useState(false)

    function handleMenuSwitch(){
        setSwitchMenu(!switchMenu)
    }


    const navigate = useNavigate()
  return (
    <div className="navbar-container">
      <nav>
        <div className="logo-section pointer" >
          <a href="#home">
          <img src={logo} alt="stucademy logo" />
          </a>
        </div>

        <div className="mobile-menu">
          {!switchMenu && <FcMenu className="icon" onClick={()=>handleMenuSwitch()} />}
          {switchMenu && <LiaTimesSolid className="icon" onClick={()=>handleMenuSwitch()} />}
        </div>

        <div className={switchMenu?"desktop-view opacity-1 ":"desktop-view "}>
          <ul 
          
          className="links-section"
          
          >
            <li><a href="#about-stucademy">About</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact-us">Contact</a></li>
          </ul>

          <div className="button-section">
            <button>Get it Now</button>
          </div>
        </div>
      </nav>
    </div>
  );
}
