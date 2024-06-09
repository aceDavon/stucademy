import { BiSortAlt2 } from "react-icons/bi"
import Head from "../../layout/head/Head"
import LayoutWithSidebar from "../../layout/template/LayoutWithSidebar"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import DeletePrompt from "../../components/admin/courses/DeletePrompt"
import EmptySubjectCatalogue from "../../components/empty_states/EmptySubjectCatalogue"
import { nameCase } from "../../utils/nameFormatter"
import { ServiceManager } from "../../context/ServiceContext"
import { HandleNotif } from "../../services/NotifHandler"
import { handleFilter } from "../../utils/searchFilter"

export default function PracticeSubject() {
  const { getAllSubjects, allSubjects: courses = [] } =
    useContext(ServiceManager)
  const navigate = useNavigate()
  const { subject } = useParams()
  const [editCourse, setEditCourse] = useState({
    toggle: false,
    toEdit: "",
  })

  const [deleteCourse, setDeleteCourse] = useState({
    deletePrompt: false,
    lessonToDelete: "",
  })
  const [allCourses, setAllCourses] = useState([])

  function handleToggleEdit(courseId) {
    setEditCourse({
      ...editCourse,
      toggle: !editCourse.toggle,
      toEdit: courseId,
    })
  }

  function handleDeleteCourse() {
    HandleNotif({
      text: "course deleted",
      type: "success",
    })
  }

  useEffect(() => {
    getAllSubjects()
  }, [])

  useEffect(() => {
    setAllCourses(courses)
  }, [courses])

  return (
    <>
      <Head title="Subject | Practice Manager" />

      <LayoutWithSidebar pageTitle={"Practice Questions"}>
        <header>
          <div className="breadcrumb mb-5 mt-3">
            <div className="location">Subjects</div>
            <div className="sign">&gt;</div>
            <div className="location">
              {" "}
              {nameCase(subject?.split("__")[0].substring(1))}
            </div>
          </div>
        </header>

        <div
          className="course-manager-container"
          onClick={() => setEditCourse({ ...editCourse, toEdit: "" })}
        >
          <b>{nameCase(subject?.split("__")[0].substring(1))} fd (24)</b>
          <div className="header">
            <div className="search-section">
              <input
                type="search"
                placeholder="Search"
                onChange={(e) => {
                  const query = e.target.value.trim()
                  if (query === "") {
                    setAllCourses(courses)
                  } else {
                    setAllCourses(handleFilter(courses, query))
                  }
                }}
              />
            </div>

            <div className="filter-button">
              <div className="select">
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setAllCourses(
                      handleFilter(courses, e.target.value, "filter")
                    )
                  }}
                >
                  <option value="all">Filter:All</option>
                  <option value="active">Filter:Active</option>
                </select>
              </div>
            </div>
          </div>

          {courses.length ? (
            <div className="history-table">
              <table>
                <thead>
                  <td>
                    S/N <BiSortAlt2 className="icon" />
                  </td>
                  <td>
                    COURSE TITLE <BiSortAlt2 className="icon" />
                  </td>

                  <td className="text-center">
                    {" "}
                    NO OF QUESTIONS <BiSortAlt2 className="icon" />
                  </td>
                  <td>
                    {" "}
                    STATUS <BiSortAlt2 className="icon" />
                  </td>
                </thead>

                <tbody>
                  {courses.length
                    ? allCourses.map((course, i) => {
                        return (
                          <tr
                            key={course.id}
                            onClick={() => navigate("lessons")}
                          >
                            <td> {i + 1} </td>
                            <td> {course.title} </td>
                            <td className=" text-center">
                              {" "}
                              {course.number_of_practice_questions}{" "}
                            </td>
                            <td className="status-column">
                              {course.status?.toLowerCase() === "1" ? (
                                <span className="active-subject">Active</span>
                              ) : (
                                <span className="inactive-subject">
                                  Inactive
                                </span>
                              )}
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

      <div className="modal">
        <DeletePrompt
          showState={deleteCourse.deletePrompt}
          setShowState={() => {
            setDeleteCourse({
              ...deleteCourse.deletePrompt,
              deletePrompt: false,
            })
          }}
          itemToDelete={"Course"}
          handleDelete={() => {
            handleDeleteCourse()
          }}
        />
      </div>
    </>
  )
}
