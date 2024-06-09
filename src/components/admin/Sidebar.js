import "../../styles/comoponents_pages/sidebar.scss"
import logo from "../../assets/icons/logo_dark.svg"
import { RxDashboard } from "react-icons/rx"
import { PiUserLight } from "react-icons/pi"
import { useLocation, useNavigate } from "react-router-dom"
import { HandleNotif } from "../../services/NotifHandler"
import { axiosInstance } from "../../services/AxiosInstance"
import { IconBase } from "react-icons"

export default function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axiosInstance
        .post("logout")
        .then((resp) => {
          if (resp) {
            HandleNotif({
              text: "Login out user",
              type: "success",
            })
            localStorage.removeItem("stucademy-tks")
            window.location.reload()
          }
        })
        .catch((err) => {
          throw new Error(err)
        })
    } catch (error) {
      HandleNotif({
        text: `Problem Login you out: ${error.message}`,
        type: "error",
      })
    }
  }

  const sideBarItems = [
    {
      title: "Dashboard",
      onclick: () => {},
      icon: <RxDashboard />,
      active: true,
      link: "/",
    },

    {
      title: "Course Manager",
      onclick: () => {},
      icon: <PiUserLight />,
      active: false,
      link: "/manager/courses",
    },

    {
      title: "Practice Questions",
      onclick: () => {},
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.0802 8.58003V15.42C21.0802 16.54 20.4802 17.58 19.5102 18.15L13.5702 21.58C12.6002 22.14 11.4002 22.14 10.4202 21.58L4.48016 18.15C3.51016 17.59 2.91016 16.55 2.91016 15.42V8.58003C2.91016 7.46003 3.51016 6.41999 4.48016 5.84999L10.4202 2.42C11.3902 1.86 12.5902 1.86 13.5702 2.42L19.5102 5.84999C20.4802 6.41999 21.0802 7.45003 21.0802 8.58003Z"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.4"
            d="M11.9999 10.9998C13.2867 10.9998 14.3299 9.95662 14.3299 8.6698C14.3299 7.38298 13.2867 6.33984 11.9999 6.33984C10.7131 6.33984 9.66992 7.38298 9.66992 8.6698C9.66992 9.95662 10.7131 10.9998 11.9999 10.9998Z"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.4"
            d="M16 16.6603C16 14.8603 14.21 13.4004 12 13.4004C9.79 13.4004 8 14.8603 8 16.6603"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      active: false,
      link: "/manager/practice",
    },

    {
      title: "Students",
      onclick: () => {},
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M17.9981 7.16C17.9381 7.15 17.8681 7.15 17.8081 7.16C16.4281 7.11 15.3281 5.98 15.3281 4.58C15.3281 3.15 16.4781 2 17.9081 2C19.3381 2 20.4881 3.16 20.4881 4.58C20.4781 5.98 19.3781 7.11 17.9981 7.16Z"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.4"
            d="M16.9675 14.4402C18.3375 14.6702 19.8475 14.4302 20.9075 13.7202C22.3175 12.7802 22.3175 11.2402 20.9075 10.3002C19.8375 9.59016 18.3075 9.35016 16.9375 9.59016"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.4"
            d="M5.96656 7.16C6.02656 7.15 6.09656 7.15 6.15656 7.16C7.53656 7.11 8.63656 5.98 8.63656 4.58C8.63656 3.15 7.48656 2 6.05656 2C4.62656 2 3.47656 3.16 3.47656 4.58C3.48656 5.98 4.58656 7.11 5.96656 7.16Z"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.4"
            d="M6.9975 14.4402C5.6275 14.6702 4.1175 14.4302 3.0575 13.7202C1.6475 12.7802 1.6475 11.2402 3.0575 10.3002C4.1275 9.59016 5.6575 9.35016 7.0275 9.59016"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.0001 14.6297C11.9401 14.6197 11.8701 14.6197 11.8101 14.6297C10.4301 14.5797 9.33008 13.4497 9.33008 12.0497C9.33008 10.6197 10.4801 9.46973 11.9101 9.46973C13.3401 9.46973 14.4901 10.6297 14.4901 12.0497C14.4801 13.4497 13.3801 14.5897 12.0001 14.6297Z"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.0907 17.7794C7.6807 18.7194 7.6807 20.2594 9.0907 21.1994C10.6907 22.2694 13.3107 22.2694 14.9107 21.1994C16.3207 20.2594 16.3207 18.7194 14.9107 17.7794C13.3207 16.7194 10.6907 16.7194 9.0907 17.7794Z"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      active: false,
      link: "/manager/students",
    },

    {
      title: "Q & A",
      onclick: () => {},
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.4"
            d="M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      active: false,
      link: "/manager/questions",
    },

    {
      title: "Queries",
      onclick: () => {},
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 13H12"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 17H16"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),

      active: false,
      link: "/manager/queries",
    },

    {
      title: "Settings",
      onclick: () => {},
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.34"
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12.8804V11.1204C2 10.0804 2.85 9.22043 3.9 9.22043C5.71 9.22043 6.45 7.94042 5.54 6.37042C5.02 5.47042 5.33 4.30042 6.24 3.78042L7.97 2.79042C8.76 2.32042 9.78 2.60042 10.25 3.39042L10.36 3.58042C11.26 5.15042 12.74 5.15042 13.65 3.58042L13.76 3.39042C14.23 2.60042 15.25 2.32042 16.04 2.79042L17.77 3.78042C18.68 4.30042 18.99 5.47042 18.47 6.37042C17.56 7.94042 18.3 9.22043 20.11 9.22043C21.15 9.22043 22.01 10.0704 22.01 11.1204V12.8804C22.01 13.9204 21.16 14.7804 20.11 14.7804C18.3 14.7804 17.56 16.0604 18.47 17.6304C18.99 18.5404 18.68 19.7004 17.77 20.2204L16.04 21.2104C15.25 21.6804 14.23 21.4004 13.76 20.6104L13.65 20.4204C12.75 18.8504 11.27 18.8504 10.36 20.4204L10.25 20.6104C9.78 21.4004 8.76 21.6804 7.97 21.2104L6.24 20.2204C5.33 19.7004 5.02 18.5304 5.54 17.6304C6.45 16.0604 5.71 14.7804 3.9 14.7804C2.85 14.7804 2 13.9204 2 12.8804Z"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      active: false,
      link: "/manager/settings",
    },
    {
      title: "Icons Manager",
      onclick: () => {},
      icon: <IconBase />,
      active: false,
      link: "/manager/icons",
    },

    {
      title: "Logout",
      onclick: () => handleLogout(),
      icon: (
        <svg
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.8458 7.3381V6.41154C13.8458 4.39057 12.3245 2.75195 10.4482 2.75195H5.95336C4.07797 2.75195 2.55664 4.39057 2.55664 6.41154V17.4648C2.55664 19.4857 4.07797 21.1244 5.95336 21.1244H10.4574C12.3282 21.1244 13.8458 19.4907 13.8458 17.4757V16.5392"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.1098 11.938H9.00781"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.4102 9.04297L20.1098 11.9379L17.4102 14.8338"
            stroke="#C6C8D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      active: false,
      link: "",
    },
  ]

  const { pathname } = useLocation()
  const thisPath = pathname.split("/:")[0]
  return (
    <div className="sidebar-container">
      <div className="logo-section">
        <img src={logo} alt="Stucademy logo" />
      </div>

      <div className="sidebar-items">
        {sideBarItems.map((item, i) => {
          return (
            <div
              key={i}
              className={
                thisPath === item.link ? "active-sidebar-item" : "item"
              }
              style={
                item.title.toLowerCase() === "logout"
                  ? { marginTop: "100px" }
                  : null
              }
              onClick={() => {
                item.title.toLowerCase() === "logout"
                  ? item.onclick()
                  : navigate(`${item.link}`)
              }}
            >
              <div className="icon">{item.icon}</div>

              <div className="text">{item.title}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
