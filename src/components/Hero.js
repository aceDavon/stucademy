import hero from "../assets/images/hero_img.svg";
import playstore from "../assets/icons/playstore.svg";
import applestore from "../assets/icons/applestore.svg";

import "../styles/hero.scss";

export default function Hero() {
  return (
    <div className="hero-container" id="home">
      <div className="text-section">
        <div className="content">
          <header>
            <h2>
              Enjoy <span className="emoji">😍</span> learning with{" "}
              <span className="secondary-color">Stucademy</span>
            </h2>
          </header>

          <p>
            Embark on an exciting journey to academic success and unlock a new
            world of learning possibilities with Stucademy. Join Stucademy now
            and start learning with confidence, on your own terms.
          </p>

          <div className="button-section">
            <div className="button pointer">
              <img
                src={applestore}
                draggable="false"
                alt="download from Applestore"
              />
            </div>

            <div className="button pointer">
              <img
                src={playstore}
                draggable="false"
                alt="download from Goodle Playstore"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="image-section">
        <img src={hero} alt="Enjoy learning with stucademy" />
      </div>
    </div>
  );
}
