import playstore from "../assets/icons/playstore.svg";
import applestore from "../assets/icons/applestore.svg";

export default function GetApp() {
  return (
    <div className="unlock-potential-container get-app-container">
      <div className="rewards-section ">
        <div className="text-section">
          <header>
            <h1>Get the Stucademy app Today</h1>
          </header>
          <p>
            Don't miss out on the ultimate learning convenience.With our app,
            you can take your learning on the go and access all of our features
            anytime, anywhere.
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
    </div>
  );
}
