import { BiSortAlt2 } from "react-icons/bi"
import { useContext, useEffect, useState } from "react"
import { formatDistance, parseISO } from "date-fns"
import { ServiceManager } from "../../../context/ServiceContext"
import { IoIosMore } from "react-icons/io"
import { axiosInstance } from "../../../services/AxiosInstance"
import EditIcon from "./EditIcon"

export function IconsTable() {
  const { courseIcons, getCourseIcons } = useContext(ServiceManager)
  const [icons, setIcons] = useState([])
  const [activeIcon, setActiveIcon] = useState({ status: false, id: null })
  const [iconToEdit, setIconToEdit] = useState(null)

  const handleDeleteIcon = async (id) => {
    await axiosInstance
      .delete(`/dashboard/course/icons/${id}`)
      .then((_) => {
        getCourseIcons()
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    setIcons(courseIcons)
  }, [courseIcons])

  useEffect(() => {
    getCourseIcons()
  }, [])

  return (
    <div className="history-table">
      <table>
        <thead>
          <tr>
            <td>
              I.D <BiSortAlt2 className="icon" />
            </td>
            <td>
              NAME <BiSortAlt2 className="icon" />
            </td>
            <td>
              STATUS <BiSortAlt2 className="icon" />
            </td>
          </tr>
        </thead>
        <tbody>
          {icons.length > 0 &&
            icons.map((icon, index) => (
              <tr key={icon.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="profile">
                    <div
                      className="avatar"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <img src={icon.url} alt="icon_base" />
                    </div>
                    <div className="texts">
                      <div className="name">{icon.name.toUpperCase()}</div>
                      <div className="username">
                        @
                        {formatDistance(parseISO(icon.created_at), new Date(), {
                          addSuffix: true,
                          unit: "short",
                        })}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="active-subject">Active</span>
                </td>

                <td className="text-center">
                  <span
                    className="options"
                    style={{ cursor: "pointer", position: "relative" }}
                  >
                    <IoIosMore
                      onClick={() =>
                        setActiveIcon({ id: icon.id, status: true })
                      }
                    />
                  </span>
                  {activeIcon.id === icon.id && activeIcon.status && (
                    <div
                      className="icon-actions"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <div
                        className="icons-action"
                        onClick={() => {
                          setActiveIcon({ id: null, status: false })
                          setIconToEdit(icon)
                        }}
                      >
                        Update Icon
                      </div>
                      <div
                        className="icons-action"
                        onClick={() => {
                          setActiveIcon({ id: null, status: false })
                          handleDeleteIcon(icon.id)
                        }}
                      >
                        Delete Icon
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
        {iconToEdit && (
          <EditIcon
            showState={!!iconToEdit}
            icon={iconToEdit}
            setShowState={() => setIconToEdit(null)}
          />
        )}
      </table>
    </div>
  )
}
