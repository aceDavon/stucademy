import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
// import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import magnet from "../../../assets/icons/magnet.svg";
import comments from "../../../assets/icons/comments.svg";
import { axiosInstance } from "../../../services/AxiosInstance";
export default function QuestionsAsked({ studentId }) {
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

  const nextSlide = () => {
    setScrolling({
      ...scrolling,
      right: true,
      left: false,
    });
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    setScrolling({
      ...scrolling,
      right: false,
      left: true,
    });
    sliderRef.current.slickPrev();
  };

  const [questionsAsked, setQuestionsAsked] = useState([]);
  const [questionsAskedMutable, setQuestionsAskedMutable] = useState([]);
  const [questionsSubjects, setQuestionsSubjects] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("all");

  async function getQuestionsAsked(studentId) {
    try {
      await axiosInstance
        .get(`/admin/${studentId}/questions-asked`)
        .then((resp) => {
          const { data } = resp;
          console.log(data);
          setQuestionsAsked(data?.questions_asked);
          setQuestionsAskedMutable(data?.questions_asked);
          setQuestionsSubjects(data?.subjects);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function handleFilter(subject) {
    const allQuestions = [...questionsAskedMutable];
    const result = [];
    if (subject) {
      for (let i = 0; i < questionsAskedMutable.length; i++) {
        const element = questionsAskedMutable[i];

        if (element?.subject.includes(subject)) {
          result.push(element);
        }
      }
    }

    return subject === "all" || !subject ? allQuestions : result;
  }
  useEffect(() => {
    getQuestionsAsked(studentId);
  }, [studentId]);

  return questionsAsked?.length ? (
    <div className="questionsAsked-container">
      {/* <header>
        <div className="controls">
          <span
            className={scrolling.left ? "active-control" : ""}
            onClick={prevSlide}
          >
            <BsArrowLeftShort />
          </span>
          <span
            className={scrolling.right ? "active-control" : ""}
            onClick={nextSlide}
          >
            {" "}
            <BsArrowRightShort />
          </span>
        </div>
      </header> */}

      <nav className="d-flex  ">
        <div className="slider-section">
          <Slider responsive={true} rows={1} ref={sliderRef} {...settings}>
            {questionsSubjects?.length ? (
              <div
                className={
                  selectedSubject === "all"
                    ? "active-subject-btn"
                    : "subject-btn"
                }
                onClick={() => {
                  setSelectedSubject("all");
                  setQuestionsAsked(handleFilter("all"));
                }}
              >
                All ({questionsAskedMutable.length})
              </div>
            ) : null}
            {questionsSubjects?.length
              ? questionsSubjects.map((item, i) => {
                  return (
                    <span
                      key={i}
                      onClick={() => {
                        setQuestionsAsked(handleFilter(item.title));
                        setSelectedSubject(item.title);
                      }}
                      className={
                        selectedSubject === item.title
                          ? "active-subject-btn"
                          : "subject-btn"
                      }
                    >
                      {item.title} ({item.number_of_questions})
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
        {/* <div className="date">Today - 10 September, 2022</div> */}

        {questionsAsked?.length
          ? questionsAsked.map((question, i) => {
              return (
                <div className="question-section" key={i}>
                  <div className="heading">
                    <span className="author">{question.student_name}</span>{" "}
                    <span className="time">
                      {new Date(question?.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="question">{question.question_text}</div>

                  <div className="question-footer">
                    <div className="item">
                      <div className="icon">
                        <img src={magnet} alt="answers" />
                      </div>
                      <span>{question.question_images_count}</span>
                    </div>
                    <div className="item">
                      <div className="icon">
                        <img src={comments} alt="comments" />
                      </div>

                      <span>{question.answer_count}</span>
                    </div>
                    <div className="subject">{question.subject}</div>
                  </div>
                </div>
              );
            })
          : null}
      </section>
    </div>
  ) : (
    "No records found"
  );
}
