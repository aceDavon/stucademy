import { BiSortAlt2 } from "react-icons/bi"
import Head from "../../../layout/head/Head"
import LayoutWithSidebar from "../../../layout/template/LayoutWithSidebar"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import EmptySubjectCatalogue from "../../../components/empty_states/EmptySubjectCatalogue"
import "../../../styles/comoponents_pages/QandAmanager.scss"
import { axiosInstance } from "../../../services/AxiosInstance"
import { handleFilter } from "../../../utils/searchFilter"

export default function QuestionsTable() {
  const navigate = useNavigate()

  const [questionsList] = useState([
    {
      subject: "Chemistry",
      qid: 43231,
      askedBy: "Onoja Voo",
      question:
        "What accounts for the variation in boiling and melting points with varying levels of impurity?",
      isAnswered: true,
      date: "21/10/22",
    },
    {
      subject: "Physics",
      qid: 78945,
      askedBy: "Sarah Johnson",
      question: "Explain the concept of gravitational force.",
      isAnswered: false,
      date: "15/09/22",
    },
    {
      subject: "Mathematics",
      qid: 12456,
      askedBy: "John Doe",
      question: "How to solve a quadratic equation?",
      isAnswered: true,
      date: "05/08/22",
    },
    {
      subject: "Biology",
      qid: 11223,
      askedBy: "Emily Smith",
      question: "Describe the process of photosynthesis.",
      isAnswered: false,
      date: "12/07/22",
    },
    {
      subject: "History",
      qid: 98765,
      askedBy: "Michael Brown",
      question: "What were the causes of World War II?",
      isAnswered: true,
      date: "28/06/22",
    },
    {
      subject: "Computer Science",
      qid: 55555,
      askedBy: "Alex Johnson",
      question: "Explain the concept of recursion.",
      isAnswered: false,
      date: "09/05/22",
    },
    {
      subject: "Geography",
      qid: 77777,
      askedBy: "Lucy Davis",
      question: "How are earthquakes formed?",
      isAnswered: true,
      date: "02/04/22",
    },
    {
      subject: "Literature",
      qid: 88888,
      askedBy: "Chris Evans",
      question: "Analysis of Shakespeare's 'Macbeth'.",
      isAnswered: true,
      date: "17/03/22",
    },
    {
      subject: "Economics",
      qid: 66666,
      askedBy: "David Lee",
      question: "Explain the concept of supply and demand.",
      isAnswered: false,
      date: "29/01/22",
    },
    {
      subject: "Art",
      qid: 99999,
      askedBy: "Sophia Brown",
      question: "Discuss the influence of Picasso on modern art.",
      isAnswered: true,
      date: "14/12/21",
    },
  ])
  const [questions, setQuestions] = useState([])
  const [questionsUnaltered, setQuestionsUnaltered] = useState([])

  async function getQuestions() {
    try {
      await axiosInstance.get(`/admin/questions-asked`).then((resp) => {
        const data = resp.data
        setQuestions(data)
        setQuestionsUnaltered(data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <>
      <Head title="All questions | Q & A" />

      <LayoutWithSidebar pageTitle={"Questions and Answers"}>
        <div className="course-manager-container all-questions-container">
          <b>All Questions ({questionsList.length})</b>
          <div className="header">
            <div className="search-section">
              <input
                type="search"
                placeholder="Search"
                onChange={(e) =>
                  setQuestions(handleFilter(questionsUnaltered, e.target.value))
                }
              />
            </div>

            <div className="filter-button">
              <div className="select">
                <select name="" id="">
                  <option value="">Filter:Chemistry</option>
                </select>
              </div>{" "}
              <div className="select">
                <select name="" id="">
                  <option value="">Sort:Today</option>
                </select>
              </div>
            </div>
          </div>

          {questions?.length ? (
            <div className="history-table">
              <table>
                <thead>
                  <td>
                    SUBJECT <BiSortAlt2 className="icon" />
                  </td>
                  <td>
                    QUESTION I.D <BiSortAlt2 className="icon" />
                  </td>
                  <td>
                    ASKED BY <BiSortAlt2 className="icon" />
                  </td>
                  <td className="text-centerK">
                    QUESTION <BiSortAlt2 className="icon" />
                  </td>

                  <td>
                    STATUS <BiSortAlt2 className="icon" />
                  </td>

                  <td className="text-center">
                    DATE <BiSortAlt2 className="icon" />
                  </td>
                </thead>

                <tbody>
                  {questions?.length
                    ? questions.map((item) => {
                        return (
                          <tr
                            key={item.question_id}
                            onClick={() => {
                              navigate(`:${item.question_id}/details`)
                            }}
                          >
                            <td> {item.subject} </td>
                            <td>{item.question_id}</td>
                            <td> {item.asked_by}</td>
                            <td className="question-tab"> {item.question} </td>

                            <td className="status-column">
                              {item?.status?.toLowerCase() === "answered" ? (
                                <span className="active-subject">Answered</span>
                              ) : (
                                <span className="inactive-subject">
                                  Unanswered
                                </span>
                              )}
                            </td>

                            <td>
                              {" "}
                              {new Date(item.date).toLocaleDateString()}{" "}
                            </td>
                          </tr>
                        )
                      })
                    : null}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptySubjectCatalogue />
          )}
        </div>
      </LayoutWithSidebar>
    </>
  )
}
