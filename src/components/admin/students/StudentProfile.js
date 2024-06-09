import Head from "../../../layout/head/Head";
import LayoutWithSidebar from "../../../layout/template/LayoutWithSidebar";
import { useEffect, useState } from "react";
import "../../../styles/comoponents_pages/studentsManager.scss";
import avatar from "../../../assets/images/emoji.svg";
import EnrolledCourses from "./EnrolledCourses";
import QuestionsAsked from "./QuestionsAsked";
import AnswersGiven from "./AnswersGiven";
import StudentAnalysis from "./StudentAnalysis";
import ProfileDetails from "./ProfileDetails";
import PointHistory from "./PointsHistory";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../services/AxiosInstance";
import { HandleNotif } from "../../../services/NotifHandler";

export default function StudentProfile() {
  const { student } = useParams();
  const [initView] = useState({
    profile: false,
    enrolled_courses: false,
    questions_asked: false,
    answers_given: false,
    analysis: false,
    points: false,
  });

  const [view, setView] = useState({
    ...initView,
    profile: true,
  });

  const [studentProfile, setStudentProfile] = useState({});

  async function getStudentProfile(studentId) {
    try {
      const { data } = await axiosInstance.get(`/admin/student/${studentId}`);
      setStudentProfile(data?.user);
    } catch (error) {
      HandleNotif({
        text: `Error getting student profile: ${error.message}`,
        type: 'error',
      });
    }
  }

  useEffect(() => {
    getStudentProfile(student?.split("__")[1]);
  }, []);
  return (
    <div>
      <Head title="Profile | Student Manager" />

      <LayoutWithSidebar pageTitle={"Student"}>
        <div className="edit-practice-question-container">
          <header>
            <div className="breadcrumb mb-3 mt-">
              <div className="location">All Students</div>
              <div className="sign">&gt;</div>
              <div className="location">
                {studentProfile?.username}
              </div>
            </div>
          </header>

          <div className="profile-section">
            <div className="avatar-section">
              <img src={studentProfile?.avatar} alt={studentProfile?.name} />
            </div>

            <div className="header mb-4">
              <nav className="lesson-navigator">
                <div
                  onClick={() => setView({ ...initView, profile: true })}
                  className={view.profile ? "active-navigator" : "button"}
                >
                  Profile
                </div>

                <div
                  onClick={() =>
                    setView({ ...initView, enrolled_courses: true })
                  }
                  className={
                    view.enrolled_courses ? "active-navigator" : "button"
                  }
                >
                  Enrolled Courses
                </div>

                <div
                  onClick={() =>
                    setView({ ...initView, questions_asked: true })
                  }
                  className={
                    view.questions_asked ? "active-navigator" : "button"
                  }
                >
                  Questions asked
                </div>

                <div
                  onClick={() => setView({ ...initView, answers_given: true })}
                  className={view.answers_given ? "active-navigator" : "button"}
                >
                  Answers Given
                </div>

                <div
                  onClick={() => setView({ ...initView, analysis: true })}
                  className={view.analysis ? "active-navigator" : "button"}
                >
                  Analysis
                </div>

                <div
                  onClick={() => setView({ ...initView, points: true })}
                  className={view.points ? "active-navigator" : "button"}
                >
                  Point history
                </div>
              </nav>
            </div>

            {view.profile ? (
              <ProfileDetails
                student={studentProfile}
                getProfile={getStudentProfile}
              />
            ) : null}

            {view.enrolled_courses ? (
              <EnrolledCourses studentId={student?.split("__")[1]} />
            ) : null}

            {view.questions_asked ? (
              <QuestionsAsked studentId={student?.split("__")[1]} />
            ) : null}

            {view.answers_given ? (
              <AnswersGiven studentId={student?.split("__")[1]} />
            ) : null}

            {view.analysis ? (
              <StudentAnalysis studentId={student?.split("__")[1]} />
            ) : null}
            {view.points ? <PointHistory student={studentProfile} /> : null}
          </div>
        </div>
      </LayoutWithSidebar>
    </div>
  );
}
