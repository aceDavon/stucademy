import "../../styles/comoponents_pages/navigation.scss"
import { CiBellOn } from "react-icons/ci"
import { GoDotFill } from "react-icons/go"
import avatar from "../../assets/images/avatar.jpg"
import { useEffect, useState } from "react"
import { axiosInstance } from "../../services/AxiosInstance"
import { HandleNotif } from "../../services/NotifHandler"

export default function Navigation({
  pageTitle,
  showNotifications,
  setShowNotifications,
}) {
  const [adminProfile, setAdminProfile] = useState({
    name: "",
    email: "",
    phone: "",
  })

  async function getAdminProfile() {
    try {
      const { data } = await axiosInstance.get(`/admin/profile`)
      setAdminProfile(data?.user)
    } catch (error) {
      HandleNotif({
        text: error.message,
        type: "error",
      })
    }
  }

  useEffect(() => {
    getAdminProfile()
    return () => setShowNotifications(false)
  }, [])

  return (
    <>
      <div
        className="navigation-container"
        onClick={() => setShowNotifications(false)}
      >
        <section className="welcome">
          <header>
            <h5>
              {pageTitle || "Welcome 👋"} {adminProfile.name || ""}
            </h5>
          </header>
        </section>
        <section className="profile-section">
          <div className="notification-icon">
            <div className="new">
              <GoDotFill />
            </div>

            <CiBellOn
              onClick={(e) => {
                e.stopPropagation()
                setShowNotifications(!showNotifications)
              }}
            />
          </div>

          <div className="avatar">
            <img src={avatar} draggable="false" alt="" />
          </div>
        </section>
      </div>
    </>
  )
}
