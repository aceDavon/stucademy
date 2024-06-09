import AchieveGoal from "../components/AchieveGoal";
import Footer from "../components/Footer";
import GetApp from "../components/GetApp";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import Testimonials from "../components/Testimonials";
import UnlockPotentials from "../components/UnlockPotentials";

import "../styles/landingPageBody.scss";
export default function Index() {
  return (
    <div className="landing-page-container">
      <NavBar />

      <div className="other-components">
        <Hero />
        <AchieveGoal />
        <UnlockPotentials />
        <Testimonials/>
        <GetApp/>



        <Footer/>
      </div>
    </div>
  );
}
