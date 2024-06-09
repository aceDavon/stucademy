import PointsStat from "./PointsStat"
import gained from "../../../assets/icons/gained.png"
import lost from "../../../assets/icons/lost.png"
import received from "../../../assets/icons/received.png"
import AddPoint from "./AddPoint"
import { useEffect, useState } from "react"
import DeductPoint from "./DeductPoint"
import { axiosInstance } from "../../../services/AxiosInstance"
import { HandleNotif } from "../../../services/NotifHandler"

export default function PointHistory({ student }) {
  const [showModal, setShowModal] = useState({
    addPoint: false,
    deductPoint: false,
  })

  const [pointHistory, setPointHistory] = useState({})

  async function handleGetPointHistory(studentId) {
    try {
      const { data } = await axiosInstance.get(`/user/${studentId}/points`)
      setPointHistory(data?.points_data)
    } catch (error) {
      HandleNotif({
        text: `Error getting point history: ${error.message}`,
        type: "error",
      })
    }
  }

  useEffect(() => {
    handleGetPointHistory(student.id)
  }, [student.id])

  return (
    <div className="point-history-container">
      <div className="header">
        <div className="buttons">
          <button
            onClick={() => setShowModal({ ...showModal, addPoint: true })}
          >
            Add Points
          </button>
          <button
            onClick={() => setShowModal({ ...showModal, deductPoint: true })}
          >
            Deduct Points
          </button>
        </div>
      </div>

      <PointsStat
        totalPoints={pointHistory?.totalPoints}
        pointsGained={pointHistory?.totalPointsGained}
        pointsLost={pointHistory?.totalPointsLost}
      />

      <div className="header-filter">
        <div className="filter-button">
          <div className="select d-flex">
            Sort:
            <select name="" id="">
              <option value="active">Today</option>
            </select>
          </div>
        </div>
      </div>

      <div className="points-history">
        {pointHistory?.pointActionHistory?.length
          ? pointHistory?.pointActionHistory.map((data, i) => {
              return (
                <div className="date-range" key={i}>
                  {data.date}

                  {data?.history?.length
                    ? data.history.map((historyDetails, i) => {
                        return (
                          <div className="item" key={i}>
                            <div className="icon-text-section">
                              <div className="icon">
                                <img
                                  src={
                                    historyDetails?.action_type === "gained" &&
                                    Math.sign(
                                      parseInt(historyDetails?.points)
                                    ) === 1
                                      ? gained
                                      : historyDetails?.action_type ===
                                        "received"
                                      ? received
                                      : Math.sign(
                                          parseInt(historyDetails?.points)
                                        ) === -1
                                      ? lost
                                      : null
                                  }
                                  alt={historyDetails?.action_type}
                                />
                              </div>
                              <div className="text-section">
                                <header>
                                  You{" "}
                                  {historyDetails?.action_type === "gained" &&
                                  Math.sign(
                                    parseInt(historyDetails?.points)
                                  ) === 1
                                    ? "gained "
                                    : "lost "}
                                  {Math.abs(historyDetails?.points)} points
                                </header>
                                <div className="subtitle">
                                  {historyDetails?.message}

                                  {/* <a>View details</a> */}
                                </div>
                              </div>
                            </div>
                            <div className="time">{historyDetails?.time}</div>
                          </div>
                        )
                      })
                    : null}
                </div>
              )
            })
          : null}

        {/* <div className="date-range">
          Today - 10 June, 2022
          <div className="item">
            <div className="icon-text-section">
              <div className="icon">
                <img src={gained} alt="" />
              </div>
              <div className="text-section">
                <header>You gained 5 points</header>
                <div className="subtitle">
                  You got 5 points for answering a question correctly.{" "}
                  <a>View details</a>
                </div>
              </div>
            </div>
            <div className="time">06:00 PM</div>
          </div>
          <div className="item">
            <div className="icon-text-section">
              <div className="icon">
                <img src={received} alt="" />
              </div>
              <div className="text-section">
                <header>You have received 10 points</header>
                <div className="subtitle">
                  You have received 10 points for attempting to answer a
                  question for Shola <a>View details</a>
                </div>
              </div>
            </div>
            <div className="time">06:00 PM</div>
          </div>
          <div className="item">
            <div className="icon-text-section">
              <div className="icon">
                <img src={lost} alt="" />
              </div>
              <div className="text-section">
                <header>You lost 5 points</header>
                <div className="subtitle">
                  You lost 5 points because your answer was reported as spam.
                  <a>View details</a>
                </div>
              </div>
            </div>
            <div className="time">06:00 PM</div>
          </div>
        </div> */}
      </div>

      <div className="modals">
        <AddPoint
          showState={showModal.addPoint}
          setShowState={() => setShowModal({ ...showModal, addPoint: false })}
          studentId={student.id}
        />{" "}
        <DeductPoint
          showState={showModal.deductPoint}
          setShowState={() =>
            setShowModal({ ...showModal, deductPoint: false })
          }
          studentId={student.id}
        />
      </div>
    </div>
  )
}
