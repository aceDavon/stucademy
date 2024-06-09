import { BiSortAlt2 } from "react-icons/bi"
import Head from "../../layout/head/Head"
import LayoutWithSidebar from "../../layout/template/LayoutWithSidebar"
import { useEffect, useState } from "react"
import EmptySubjectCatalogue from "../../components/empty_states/EmptySubjectCatalogue"
import { axiosInstance } from "../../services/AxiosInstance"
import { useParams } from "react-router-dom"
import { BreadCrumb } from "../../components/BreadCrumb"
import { handleFilter } from "../../utils/searchFilter"
import { HandleNotif } from "../../services/NotifHandler"

export default function CourseStudents() {
  const { course } = useParams()

  const [courseStudents, setCourseStudents] = useState([])
  const [originalArr, setOriginalArr] = useState([])

  async function getCourseStudents(courseId) {
    try {
      const { data } = await axiosInstance.get(`/admin/${courseId}/students`)
      setCourseStudents(data?.students)
      setOriginalArr(data?.students)
    } catch (error) {
      HandleNotif({
        text: error.message,
        type: "error",
      })
    }
  }

  useEffect(() => {
    getCourseStudents(course?.split("__")[1])
  }, [])

  return (
    <>
      <Head title="Subject | Course Manager" />

      <LayoutWithSidebar pageTitle={"Course Manager"}>
        <BreadCrumb />
        <div className="course-manager-container">
          <b>All Students ({courseStudents.length})</b>
          <div className="header">
            <div className="search-section" style={{ height: "15px" }}>
              <input
                type="search"
                placeholder="Search"
                onChange={(e) => {
                  const query = e.target.value.trim()
                  if (query === "") {
                    setCourseStudents(originalArr)
                  } else {
                    setCourseStudents(handleFilter(courseStudents, query))
                  }
                }}
              />
            </div>

            <div className="filter-button">
              <div className="select">
                <select
                  name=""
                  id=""
                  onChange={(e) => handleFilter(courseStudents, e.target.value)}
                >
                  <option value="all">Filter:All</option>
                  <option value="active">Filter:Active</option>
                </select>
              </div>
            </div>
          </div>

          {courseStudents.length ? (
            <div className="history-table">
              <table>
                <thead>
                  <td>
                    I.D <BiSortAlt2 className="icon" />
                  </td>
                  <td>
                    NAME <BiSortAlt2 className="icon" />
                  </td>
                  <td>
                    EMAIL <BiSortAlt2 className="icon" />
                  </td>
                  <td className="text-center">
                    PHONE NUMBER <BiSortAlt2 className="icon" />
                  </td>
                  <td className="text-center">
                    POINTS <BiSortAlt2 className="icon" />
                  </td>
                  <td>
                    STATUS <BiSortAlt2 className="icon" />
                  </td>
                </thead>

                <tbody>
                  {courseStudents.length
                    ? courseStudents.map((student, index) => {
                        return (
                          <tr key={student.id}>
                            <td> {index + 1} </td>
                            <td>
                              <div className="profile">
                                <div className="avatar">
                                  <img
                                    src={student.avatar}
                                    alt={student.name}
                                  />
                                </div>
                                <div className="texts">
                                  <div className="name">{student.name}</div>
                                  <div className="username">
                                    @{student.username}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td> {student.email}</td>
                            <td className="text-center"> {student.phone} </td>
                            <td className="text-center"> {student.points} </td>
                            <td className="status-column">
                              {student.status ? (
                                <span className="active-subject">Active</span>
                              ) : (
                                <span className="inactive-subject">
                                  Inactive
                                </span>
                              )}
                              {/* <span className="options">
                                <IoIosMore
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleEdit(student.id);

                                    console.log(editCourse);
                                  }}
                                />
                                {editCourse.toEdit === student.id && (
                                  <div
                                    className="options-menu"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    <div
                                      className="item"
                                      onClick={() => {
                                        navigate("course/edit");
                                      }}
                                    >
                                      {" "}
                                      <FiEdit3 /> Edit
                                    </div>
                                    <div
                                      className="item"
                                      onClick={() => {
                                        navigate("course/students");
                                      }}
                                    >
                                      {" "}
                                      <AiOutlineEye />
                                      View students
                                    </div>{" "}
                                    <div
                                      className="item"
                                      onClick={() => {
                                        setDeleteCourse({
                                          ...deleteCourse.deletePrompt,
                                          deletePrompt: true,
                                        });
                                      }}
                                    >
                                      {" "}
                                      <SlTrash />
                                      Delete
                                    </div>
                                  </div>
                                )}
                              </span> */}
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
