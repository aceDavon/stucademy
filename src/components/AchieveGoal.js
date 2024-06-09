import goals from "../assets/images/goals.svg";
import { AiOutlineStar } from "react-icons/ai";

export default function AchieveGoal() {
  return (
    <section className="achieve-goal-container" id="about-stucademy">
      <div className="content-width">
        <div className="header-section">
        <header>
          <h2>
            Achieve your goals with{" "}
            <span className="secondary-color">Stucademy</span>
          </h2> 
        </header>
        <p>
            Whether you're looking to catch up on your studies, get ahead, or
            simply improve your understanding, Stucademy has something for you.
            Start learning now and take control of your education with
            Stucademy.
          </p>
        </div>

        <div className="section-row">
          <div className="image-section">
            <img src={goals} alt="achieve your goals with stucademy" />
          </div>

          <div className="text-section">
            <h5>Are you...</h5>

            <div className="item">
              <div className="star">
                <AiOutlineStar />
              </div>
              <p>Struggling to learn a topic or not understanding a subject?</p>
            </div>

            <div className="item">
              <div className="star">
                <AiOutlineStar />
              </div>
              <p>
                Feeling overwhelmed by upcoming exams? Do you need to improve
                your exam readiness?
              </p>
            </div>

            <div className="item">
              <div className="star">
                <AiOutlineStar />
              </div>
              <p>
                Interested in sharing your knowledge and helping others learn?
              </p>
            </div>

            <div className="item">
              <div className="star">
                <AiOutlineStar />
              </div>
              <p>
                Looking to challenge yourself and have a friendly competition
                with your peers while studying?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
