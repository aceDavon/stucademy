import Head from "../../../layout/head/Head"
import LayoutWithSidebar from "../../../layout/template/LayoutWithSidebar"
import avatar from "../../../assets/images/dorcas.jpg"
import thumbnail from "../../../assets/images/courses/chemistry.jpg"
import eye from "../../../assets/icons/eye.png"
import best_answer from "../../../assets/icons/best_answer.svg"
import like from "../../../assets/icons/likes.svg"
import dislike from "../../../assets/icons/dislike.svg"
import { useParams } from "react-router-dom"
import { handleGetData } from "../../../services/GetData"
import { useEffect, useState } from "react"
import { HandleNotif } from "../../../services/NotifHandler"
import { axiosInstance } from "../../../services/AxiosInstance"

export default function QuestionDetails() {
  const { questionId } = useParams()

  const [question, setQuestion] = useState({})
  const [updatedQuestion, setUpdateQuestion] = useState({})

  const handleStatusChange = async (id, type, QuestionStatus) => {
    try {
      const newStatus = QuestionStatus === "Answered" ? 0 : 1

      const resp = await axiosInstance.put(`/${type}/${id}/status`, {
        status: newStatus,
      })

      if (resp.data.status === "true") {
        HandleNotif({
          text: "status updated successfully",
          type: "success",
        })

        const updatedData = {
          ...question,
          status: newStatus,
        }
        setUpdateQuestion(updatedData)
      }
    } catch (error) {
      HandleNotif({
        text: `Could not update Status: ${error.message}`,
        type: "error",
      })
    }
  }

  async function getQuestionAnswers() {
    const response = await handleGetData(
      `questions-asked/${questionId?.split(":")[1]}`
    )
    setQuestion(response)
  }

  useEffect(() => {
    getQuestionAnswers()
  }, [questionId, updatedQuestion])

  return (
    <>
      <Head title="Question and answers | Q & A" />

      <LayoutWithSidebar pageTitle={"Questions and Answers"}>
        <header>
          <div className="breadcrumb mb-3 mt-">
            <div className="location">All Questions</div>
            <div className="sign">&gt;</div>
            <div className="location"> {question?.question}</div>
          </div>
        </header>

        <div className="question-with-answers-container-bg">
          <div className="question-with-answers-container">
            <div className="summary-section">
              <div className="profile">
                <div className="avatar">
                  <img src={avatar} alt="question.askedBy" />
                </div>
                <div className="names">
                  <div className="username">{question?.asked_by}</div>{" "}
                  {/*This should be student's username not full name*/}
                  <div className="subtitle">
                    Student ID: {question?.student_id || "undefined"}
                  </div>
                </div>
              </div>

              <div className="date-time-section subtitle">
                <div className="key">
                  Date:{" "}
                  <b>{new Date(question?.created_date).toLocaleDateString()}</b>{" "}
                </div>
                <div className="key">
                  Time:{" "}
                  <b>{new Date(question?.created_date).toLocaleTimeString()}</b>{" "}
                </div>
              </div>
            </div>

            <p className="mt-3 mb-2 fw-500">Question</p>

            <div className="question-section">
              <div className="question">{question?.question}</div>
              <div className="image-section">
                <p>Attached image</p>
                <div className="image">
                  <img src={thumbnail} alt="" />
                  <div className="preview">
                    Preview <img src={eye} alt="preview" />
                  </div>
                </div>
              </div>
            </div>

            <div className="fw-500 subject-container">
              Subject
              <div className="subject ">{question?.subject || "undefined"}</div>
              <div className="status-section mt-3">
                <div className="">Status</div>
                <div className="toggle-container ">
                  <input
                    type="checkbox"
                    id={"course-status"}
                    className="toggle-input"
                    checked={question?.status === "Answered" ? true : false}
                    onChange={() =>
                      handleStatusChange(
                        questionId?.substring(1),
                        "question-asked",
                        question?.status
                      )
                    }
                  />
                  <label htmlFor={"course-status"} className="toggle-label">
                    <div className="toggle-slider"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 mb-2 fw-bold">Answers</p>

          <div className="answer-section  ">
            {question?.answers?.map((answer) => {
              return (
                <div className="d-flex justify-content-between">
                  <div className="fw-500 answered-by">
                    Answered by{" "}
                    <span className="primary-color ">OnojaVoo </span>
                  </div>
                  <div className="status-section">
                    <div className="">Status</div>
                    <div className="toggle-container ">
                      <input
                        type="checkbox"
                        id={"course-status"}
                        className="toggle-input"
                        defaultChecked={true}
                        onChange={() => {}}
                      />
                      <label htmlFor={"course-status"} className="toggle-label">
                        <div className="toggle-slider"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="question-with-answers-container mt-3">
              <div className="answer-stat d-flex justify-content-between align-items-center">
                <div className="stat d-flex gap-3 w-75">
                  <span className="date">12/03/23 10:15am</span>
                  <span className="d-flex justify-content-between align-items-center w-25">
                    <span className="like d-flex gap-2">
                      {" "}
                      <img src={like} alt="" />
                      1.1k
                    </span>
                    <span className="dislike d-flex gap-2">
                      {" "}
                      <img src={dislike} alt="" />0
                    </span>
                  </span>
                </div>
                <div className="rate">
                  <img src={best_answer} draggable="true" alt="" />
                </div>
              </div>
              <div className="question-section">
                <div className="question answer">
                  The exciting frequencies of a propeller are generally rpm ×
                  number of blades and higher harmonics
                </div>
                <div className="image-section">
                  <p>Attached image</p>
                  <div className="image">
                    <img src={thumbnail} alt="" />
                    <div className="preview">
                      Preview <img src={eye} alt="preview" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="answer-section">
            <div className="d-flex justify-content-between">
              <div className="fw-500 answered-by">
                Answered by <span className="primary-color ">Big_Neiz21</span>
              </div>
              <div className="status-section">
                <div className="">Status</div>
                <div className="toggle-container ">
                  <input
                    type="checkbox"
                    id={"course-status"}
                    className="toggle-input"
                    defaultChecked={true}
                    onChange={() => {}}
                  />
                  <label htmlFor={"course-status"} className="toggle-label">
                    <div className="toggle-slider"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="question-with-answers-container mt-3">
              <div className="answer-stat d-flex justify-content-between align-items-center">
                <div className="stat d-flex gap-3 w-75">
                  <span className="date">12/03/23 10:15am</span>
                  <span className="d-flex justify-content-between align-items-center w-25">
                    <span className="like d-flex gap-2">
                      {" "}
                      <img src={like} alt="" />
                      1.1k
                    </span>
                    <span className="dislike d-flex gap-2">
                      {" "}
                      <img src={dislike} alt="" />0
                    </span>
                  </span>
                </div>
                <div className="rate">
                  <img src={best_answer} draggable="true" alt="" />
                </div>
              </div>
              <div className="question-section">
                <div className="question answer">
                  The exciting frequencies of a propeller are generally rpm ×
                  number of blades and higher harmonics
                </div>
                <div className="image-section">
                  <p>Attached image</p>
                  <div className="image">
                    <img src={thumbnail} alt="" />
                    <div className="preview">
                      Preview <img src={eye} alt="preview" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWithSidebar>
    </>
  )
}
