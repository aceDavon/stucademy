import Head from "../../../layout/head/Head"
import LayoutWithSidebar from "../../../layout/template/LayoutWithSidebar"
import courseImage from "../../../assets/images/courses/biology.webp"
import left from "../../../assets/icons/page_left.svg"
import right from "../../../assets/icons/page_right.svg"
import { useEffect, useState } from "react"

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css"
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
import DeletePrompt from "./DeletePrompt"
import StudentsOnQuestion from "./StudentsOnQuestion"
import { BreadCrumb } from "../../BreadCrumb"
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../../services/AxiosInstance"
import { HandleNotif } from "../../../services/NotifHandler"
import ModalPracticeQuestionEdit from "./Modal_PracticeQuestionEdit"

export default function PracticeQuestionsEdit() {
  const { lessonId } = useParams()
  const [showLesson, setShowLesson] = useState({
    questions: true,
    students: false,
  })

  const [editQuestion, setEditQuestion] = useState(false)
  const [deleteQuestion, setDeleteQuestion] = useState(false)
  const [questions, setQuestions] = useState([])

  const fetchQuestions = () => {
    try {
      axiosInstance
        .get(`admin/practice-questions/lesson/${lessonId}`)
        .then((resp) => {
          if (resp.data.status) {
            setQuestions(resp.data.practice_questions)
          } else {
            throw new Error(
              "There was an issue getting questions, try again..."
            )
          }
        })
    } catch (error) {
      HandleNotif({
        text: `There was an error, ${error.message}`,
      })
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  // const jobs = [
  //   {
  //     title: "admins",
  //     levels: ["administrator", "adv-admin", "platform"],
  //   },

  //   {
  //     title: "Designers",
  //     levels: [{ name: "administrator", vacancies: "5" }],
  //   },

  //   {
  //     title: "engineers",
  //     levels: [],
  //   },
  // ]

  return (
    <div>
      <Head title="Edit question | Practice Course" />

      <LayoutWithSidebar pageTitle={"Practice Question Manager"}>
        <div className="edit-practice-question-container">
          <header>
            <div className="breadcrumb mb-3 mt-">
              <BreadCrumb />
            </div>
          </header>

          <div className="header">
            <nav className="lesson-navigator">
              <div
                onClick={() =>
                  setShowLesson({
                    ...showLesson,
                    questions: true,
                    students: false,
                  })
                }
                className={showLesson.questions ? "active-navigator" : "button"}
              >
                Practice Questions ({questions.length}){" "}
              </div>
              <div
                onClick={() =>
                  setShowLesson({
                    ...showLesson,
                    questions: false,
                    students: true,
                  })
                }
                className={showLesson.students ? "active-navigator" : "button"}
              >
                Students (24)
              </div>
            </nav>
          </div>

          {showLesson.questions ? (
            <header className="course-heading">
              <figure>
                <img src={courseImage} alt="course_image" />
              </figure>
              <h4>Questions</h4>
            </header>
          ) : null}

          <div className="accordion-section p-3 rounded">
            {showLesson.questions ? (
              questions.length > 0 ? (
                <Accordion allowZeroExpanded={true}>
                  {questions.map((question) => (
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <span>
                            <span className="serial_number">-</span>
                            {question.question_text}
                          </span>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <ol>
                          {[
                            question.option_1,
                            question.option_2,
                            question.option_3,
                            question.option_4,
                          ].map((option, index) => (
                            <li key={index}>
                              <span>{option}</span>{" "}
                              {option === question.solution && (
                                <span className="answer-indicator">Answer</span>
                              )}
                            </li>
                          ))}
                        </ol>
                        <div className="action-buttons">
                          <button
                            className="delete-btn"
                            onClick={() => setDeleteQuestion(true)}
                          >
                            Delete
                          </button>
                          <button
                            className="edit-btn"
                            onClick={() => {
                              setEditQuestion(true)
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </AccordionItemPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <span style={{ textAlign: "center" }}>
                  No question added for this lesson yet.
                </span>
              )
            ) : (
              <StudentsOnQuestion questionId={"5423434"} />
            )}

            <footer className="pagination-footer">
              <div className="range">1-5 of 10 items</div>
              <div className="controllers-section">
                <div className="pages-list">
                  <img src={left} alt="move left" />
                  <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>...</li>
                    <li>19</li>
                  </ul>
                  <img src={right} alt="move right" />
                </div>

                <div className="counter-section">
                  <div className="count">10</div>
                  <div className="controller">
                    <div className="up">
                      {" "}
                      <AiFillCaretUp />{" "}
                    </div>
                    <div className="down">
                      {" "}
                      <AiFillCaretDown />{" "}
                    </div>
                  </div>
                </div>
              </div>
            </footer>

            <section className="activate-question d-flex justify-content-end mt-2 align-items-center gap-2">
              <span>Active</span>
              <span>
                {" "}
                <div className="toggle-containe">
                  <input
                    type="checkbox"
                    id={"question-activator"}
                    className="toggle-input"
                    defaultChecked={true}
                    onChange={(e) => {
                      // e.stopPropagation()
                      // handleToggle();
                    }}
                  />
                  <label
                    htmlFor={"question-activator"}
                    className="toggle-label"
                  >
                    <div className="toggle-slider"></div>
                  </label>
                </div>
              </span>
            </section>
          </div>
        </div>
      </LayoutWithSidebar>

      <div className="modals">
        <ModalPracticeQuestionEdit
          showState={editQuestion}
          setShowState={() => setEditQuestion(false)}
        />{" "}
        <DeletePrompt
          showState={deleteQuestion}
          setShowState={() => setDeleteQuestion(false)}
          itemToDelete={"practice question"}
          handleDelete={() => {}}
        />
      </div>
    </div>
  )
}
