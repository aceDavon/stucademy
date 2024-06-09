import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
// import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import likes from "../../../assets/icons/likes.svg";
import dislikes from "../../../assets/icons/dislike.svg";
import best from "../../../assets/icons/best_answer.svg";
import { axiosInstance } from "../../../services/AxiosInstance";
export default function AnswersGiven({ studentId }) {
  const sliderRef = useRef(null);
  const [scrolling, setScrolling] = useState({
    right: true,
    left: false,
  });
  const settings = {
    slidesToShow: 4.5,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [answersGiven, setAnswersGiven] = useState([]);
  const [answersGivenMutable, setAnswersGivenMutable] = useState([]);
  const [answersSubjects, setAnswersSubjects] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("all");

  async function getAnswersGiven(studentId) {
    try {
      await axiosInstance
        .get(`/admin/${studentId}/answers-given`)
        .then((resp) => {
          const { data } = resp;
          setAnswersGiven(data?.answers_given);
          setAnswersGivenMutable(data?.answers_given);
          setAnswersSubjects(data?.subjects);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function handleFilter(subject) {
    const allQuestions = [...answersGivenMutable];
    const result = [];
    if (subject) {
      for (let i = 0; i < answersGivenMutable.length; i++) {
        const element = answersGivenMutable[i];

        if (element?.subject.includes(subject)) {
          result.push(element);
        }
      }
    }

    return subject === "all" || !subject ? allQuestions : result;
  }
  useEffect(() => {
    getAnswersGiven(studentId);
  }, [studentId]);
  return answersGiven.length ? (
    <div className="questionsAsked-container">
      <nav className="d-flex  ">
        <div className="slider-section">
          <Slider responsive={true} rows={1} ref={sliderRef} {...settings}>
            {answersSubjects?.length ? (
              <div
                className={
                  selectedSubject === "all"
                    ? "active-subject-btn"
                    : "subject-btn"
                }
                onClick={() => {
                  setSelectedSubject("all");
                  setAnswersGiven(handleFilter("all"));
                }}
              >
                All ({answersGivenMutable.length})
              </div>
            ) : null}
            {answersSubjects?.length
              ? answersSubjects.map((item, i) => {
                  return (
                    <span
                      key={i}
                      onClick={() => {
                        setAnswersGiven(handleFilter(item.title));
                        setSelectedSubject(item.title);
                      }}
                      className={
                        selectedSubject === item.title
                          ? "active-subject-btn"
                          : "subject-btn"
                      }
                    >
                      {item.title} ({item.number_of_answers})
                    </span>
                  );
                })
              : null}
          </Slider>
        </div>

        <div className="filter-button">
          <div className="select d-flex">
            Sort:
            <select name="" id="">
              <option value="active">Daily</option>
            </select>
          </div>
        </div>
      </nav>

      <section className="dated-question">
        {answersGiven?.length
          ? answersGiven.map((answer, i) => {
              return (
                <div className="question-section answer-section" key={i}>
                  <div className="heading">
                    <div className="author-section">
                      <span className="author">{answer.student_name}</span>{" "}
                      <span className="time">
                        {" "}
                        {new Date(answer?.created_at).toLocaleTimeString()}
                      </span>
                      {answer.best_answer ? (
                        <img src={best} draggable="false" alt="best answer" />
                      ) : null}
                    </div>
                    <div className="likes-section">
                      <div className="item">
                        <div className="icon">
                          <img src={likes} alt="answers" />
                        </div>

                        <span>{answer.likes}</span>
                      </div>
                      <div className="item">
                        <div className="icon">
                          <img src={dislikes} alt="comments" />
                        </div>

                        <span>{answer.dislikes}</span>
                      </div>
                    </div>
                  </div>
                  <div className="question">{answer.answer_text}</div>

                  <div className="question-footer">
                    <div className="subject">{answer.subject}</div>
                  </div>
                </div>
              );
            })
          : null}

        {/* <div className="question-section answer-section">
          <div className="heading">
            <div className="author-section">
              <span className="author">Abdulfatai Lawal</span>{" "}
              <span className="time">10:10 AM</span>
              <img src={best} draggable="false" alt="best answer" />
            </div>
            <div className="likes-section">
              <div className="item">
                <div className="icon">
                  <img src={likes} alt="up vote" />
                </div>

                <span>1.1k</span>
              </div>
              <div className="item">
                <div className="icon">
                  <img src={dislikes} alt="down votes" />
                </div>

                <span>2</span>
              </div>
            </div>
          </div>
          <div className="question">
            A transformer which supplies 12V when connected to 240V mains takes
            0.55A from the mains when used to light five 12V, 24W lamps in
            parallel. Find its efficiency and the cost of using it for 12hr, at
            60k per kWh.
          </div>

          <div className="question-footer">
            <div className="subject">Chemistry</div>
          </div>
        </div> */}
      </section>
    </div>
  ) : (
    "No records found"
  );
}
