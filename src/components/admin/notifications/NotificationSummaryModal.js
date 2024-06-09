import "../../../styles/comoponents_pages/notifications.scss"
import coverImg2 from "../../../assets/images/courses/biology.webp"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../../../services/AxiosInstance"
import { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"

export default function NotificationSummaryMOdal() {
  const [allNotification, setAllNotification] = useState([])
  const navigate = useNavigate()

  const getAllNotification = async () => {
    try {
      const data = await axiosInstance.get("/profile/notifications")
      const response = await data.data;
      response.notifications
        ? setAllNotification(response.notifications)
        : setAllNotification([])
    } catch (error) {
      console.error(`There was an error: ${error}`)
    }
  }

  useEffect(() => {
    getAllNotification()
  }, [])

  return (
    <div
      className="notification-summary-modal-container"
      onClick={(e) => e.stopPropagation()}
    >
      <header className="modal-header ">
        Notification
        <div className="switch-section d-flex align-items-center gap-2">
          Do not disturb{" "}
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
      </header>

      <div className="modal-body-area py-4">
        {allNotification.map((notifData) => (
          <div
            key={notifData.id}
            className={notifData.read_at ? "read-item" : "item"}
          >
            <div className="text">
              <h6>{notifData.data.content}</h6>
              <div className="underlay-text">
                {formatDistanceToNow(notifData.created_at, {
                  includeSeconds: true,
                })}
              </div>
            </div>
            <div className="icon">
              {" "}
              <img src={coverImg2} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className="modal-footer-area text-center justify-content-center">
        <b onClick={() => navigate("/notifications")}>View all activity</b>
      </div>
    </div>
  )
}
