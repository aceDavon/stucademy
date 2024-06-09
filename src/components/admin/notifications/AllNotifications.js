import { BiFilter } from "react-icons/bi"
import coverImg2 from "../../../assets/images/courses/biology.webp"
import { useEffect, useState } from "react"
import { axiosInstance } from "../../../services/AxiosInstance"
import { formatDistanceToNow } from "date-fns"
import { filterData as filterKeys } from "./NotifFilterData"
import { HandleNotif } from "../../../services/NotifHandler"

export default function AllNotifications() {
  const [allNotification, setAllNotification] = useState([])
  const [filterData, setFilterData] = useState(filterKeys)

  const groupNotificationsByDate = (notifications) => {
    const groupedByDate = {}

    notifications.forEach((notification) => {
      const date = new Date(notification.created_at).toDateString()

      if (!groupedByDate[date]) {
        groupedByDate[date] = []
      }

      groupedByDate[date].push(notification)
    })

    return groupedByDate
  }

  const sortNotificationsByDate = (groupedNotifications) => {
    const sortedByDate = {}

    Object.keys(groupedNotifications).forEach((date) => {
      const sortedNotifications = groupedNotifications[date].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      )

      sortedByDate[date] = sortedNotifications
    })

    return sortedByDate
  }

  const getAllNotification = async () => {
    try {
      const data = await axiosInstance.get("/admin/notifications")
      const response = await data.data
      response.notifications
        ? setAllNotification(
            sortNotificationsByDate(
              groupNotificationsByDate(response.notifications)
            )
          )
        : setAllNotification([])
    } catch (error) {
      HandleNotif({
        text: `There was an error: ${error}`,
        type: "error",
      })
    }
  }

  const handleCheckboxChange = (id, type = 1) => {
    if (type === 0) {
      const updatedFilters = filterData.map((filter) => ({
        ...filter,
        checked: false,
      }))
      setFilterData(updatedFilters)
    } else {
      const updatedFilters = filterData.map((filter) =>
        filter.id === id ? { ...filter, checked: !filter.checked } : filter
      )
      setFilterData(updatedFilters)
    }
  }

  const notificationList = () => {
    const result = []

    for (const [key, value] of Object.entries(allNotification)) {
      result.push(
        <div className="dated-items" key={key}>
          <div className="date underlay-text">
            {new Date(key).toLocaleDateString()}
          </div>
          {value.map((notif) => (
            <div
              key={notif.id}
              className={notif.read_at ? "read-item" : "item"}
            >
              <div className="text">
                <h6>{notif.data.message}</h6>
                <div className="underlay-text">
                  {formatDistanceToNow(new Date(notif.created_at), {
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
      )
    }

    return result
  }

  useEffect(() => {
    getAllNotification()
  }, [])

  return (
    <div className="all-notifications-container">
      <div className="filter-section">
        <header>
          {" "}
          <BiFilter className="icon" /> Filters
        </header>
        <button
          className="clear-btn"
          onClick={() => handleCheckboxChange(filterData[0].id, 0)}
        >
          Clear all Filters
        </button>

        {filterData.map((item) => (
          <div key={item.id} className="filter-item">
            <label htmlFor={item.value} className="text-capitalize">
              {item.name}
            </label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(item.id)}
              checked={item.checked}
              id={item.value}
            />
          </div>
        ))}
      </div>

      <div className="notifications-list">
        <div className="dated-items">{notificationList()}</div>
      </div>
    </div>
  )
}
