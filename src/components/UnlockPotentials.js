import potentials from "../assets/images/potentials.svg";
import easy from "../assets/icons/easy.svg";
import personalized from "../assets/icons/personal.svg";
import tests from "../assets/icons/test.svg";
import answer from "../assets/icons/answer.svg";
import playstore from "../assets/icons/playstore.svg";
import applestore from "../assets/icons/applestore.svg";

export default function UnlockPotentials() {
  return (
    <div className="unlock-potential-container">
      <div className="content-width">
        <div className="heading-section">
          <header>
            <h2>
              <span className="green">Unlock</span> your learning potential
            </h2>
          </header>

          <p>
            Welcome to Stucademy, where learning is easy and fun! Our platform
            offers easy to understand lessons, comprehensive practice questions
            and a supportive community of students to motivate you to succeed
          </p>
        </div>

        <div className="section-row">
          <div className="text-section">
            <header>
              <h4>Enjoy access to</h4>
            </header>
            <div className="grid-area">
              <div className="item">
                <div className="icon">
                  <img draggable="false" src={easy} alt="easy access" />
                </div>

                <header>Easy to understand lessons</header>

                <p>
                  Bring your learning to life with our short and concise lessons
                  that make education fun and engaging
                </p>
              </div>

              <div className="item">
                <div className="icon">
                  <img
                    draggable="false"
                    src={personalized}
                    alt="personalized learning"
                  />
                </div>

                <header>Personalized Learning Path</header>

                <p>
                  Choose what you want to learn and progress at your own pace.
                </p>
              </div>

              <div className="item">
                <div className="icon">
                  <img
                    draggable="false"
                    src={tests}
                    alt="extensive practice test"
                  />
                </div>

                <header>Extensive practice tests</header>

                <p>
                  Test your knowledge with our comprehensive practice tests that
                  help you identify areas for improvement.
                </p>
              </div>

              <div className="item">
                <div className="icon">
                  <img
                    draggable="false"
                    src={answer}
                    alt="questions and answers"
                  />
                </div>

                <header>Ask and Answer Questions</header>

                <p>
                  Get personalized support from your classmates with our Q&A
                  feature – ask questions, help others, and learn together.
                </p>
              </div>
            </div>
          </div>

          <div className="image-section">
            <img
              draggable="false"
              src={potentials}
              alt="unlock your potentials"
            />
          </div>
        </div>
      </div>

      <div className="rewards-section ">
        <div className="text-section">
          <header>
            <h1>Rise to the Top: Unlock Exclusive Rewards</h1>
          </header>
          <p>
            Take your learning to the next level and earn special perks for
            being a top student
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
