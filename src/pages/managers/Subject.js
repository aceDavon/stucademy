import { BiSortAlt2 } from "react-icons/bi"
import { IoIosMore } from "react-icons/io"
import Head from "../../layout/head/Head"
import LayoutWithSidebar from "../../layout/template/LayoutWithSidebar"
import { useNavigate, useParams } from "react-router-dom"
import { FiEdit3 } from "react-icons/fi"
import { AiOutlineEye } from "react-icons/ai"
import { SlTrash } from "react-icons/sl"
import { useState } from "react"
import DeletePrompt from "../../components/admin/courses/DeletePrompt"
import EmptySubjectCatalogue from "../../components/empty_states/EmptySubjectCatalogue"
import { axiosInstance } from "../../services/AxiosInstance"
import { useEffect } from "react"
import { useContext } from "react"
import { ServiceManager } from "../../context/ServiceContext"
import { BreadCrumb } from "../../components/BreadCrumb"
import { handleFilter } from "../../utils/searchFilter"

export default function Subject() {
  const navigate = useNavigate()
  const { subjectId } = useParams()
  const { subjectsCourses, getSubjectsCourses } = useContext(ServiceManager)

  const [editCourse, setEditCourse] = useState({
    toggle: false,
    toEdit: "",
  })

  const [deleteCourse, setDeleteCourse] = useState({
    deletePrompt: false,
    lessonToDelete: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const [courses, setCourses] = useState([])

  function handleToggleEdit(courseId) {
    setEditCourse({
      ...editCourse,
      toggle: !editCourse.toggle,
      toEdit: editCourse.toEdit ? "" : courseId,
    })
  }

  async function handleDeleteCourse(courseId) {
    setIsLoading(true)
    try {
      await axiosInstance.delete(`/admin/course/${courseId}`).then((resp) => {
        setIsLoading(false)
        getSubjectsCourses(subjectId.split("__")[1])
        setDeleteCourse({
          ...deleteCourse.deletePrompt,
          deletePrompt: false,
          lessonToDelete: "",
        })
      })
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getSubjectsCourses(subjectId.split("__")[1])
  }, [])

  useEffect(() => {
    setCourses(subjectsCourses)
  }, [subjectsCourses])

  return (
    <>
      <Head title="Subject | Course Manager" />

      <LayoutWithSidebar pageTitle={"Course Manager"}>
        <BreadCrumb />
        <div
          className="course-manager-container"
          onClick={() => setEditCourse({ ...editCourse, toEdit: "" })}
        >
          <b>All Courses ({subjectsCourses?.length})</b>
          <div className="header">
            <div className="search-section">
              <input
                type="search"
                placeholder="Search"
                onChange={(e) => {
                  const query = e.target.value.trim()
                  if (query === "") {
                    setCourses(subjectsCourses)
                  } else {
                    setCourses(handleFilter(subjectsCourses, query))
                  }
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <div className="filter-button">
                <button
                  onClick={() => {
                    navigate("course/new")
                  }}
                >
                  Add New Course
                </button>
              </div>
              <div className="filter-button">
                <div className="select">
                  <select
                    name=""
                    id=""
                    onChange={(e) => {
                      setCourses(
                        handleFilter(subjectsCourses, e.target.value, "filter")
                      )
                    }}
                  >
                    <option value="all">Filter:All</option>
                    <option value="active">Filter:Active</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {subjectsCourses?.length ? (
            <div className="history-table">
              <table>
                <thead>
                  <td>
                    S/N <BiSortAlt2 className="icon" />
                  </td>
                  <td>
                    COURSE TITLE <BiSortAlt2 className="icon" />
                  </td>
                  <td>
                    LESSONS <BiSortAlt2 className="icon" />
                  </td>
                  <td className="text-center">
                    {" "}
                    ENROLLED STUDENTS <BiSortAlt2 className="icon" />
                  </td>
                  <td>
                    {" "}
                    STATUS <BiSortAlt2 className="icon" />
                  </td>
                </thead>

                <tbody>
                  {subjectsCourses?.length
                    ? courses.map((course, i) => {
                        return (
                          <tr key={course.id}>
                            <td> {i + 1} </td>
                            <td> {course?.title} </td>
                            <td> {course?.lessons || 0} Lessons </td>
                            <td className="text-center">
                              {" "}
                              {course?.enrolled_students || 0}
                            </td>
                            <td className="status-column">
                              {course?.status !== "0" ? (
                                <span className="active-subject">Active</span>
                              ) : (
                                <span className="inactive-subject">
                                  Inactive
                                </span>
                              )}
                              <span className="options">
                                <IoIosMore
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleToggleEdit(course.id)
                                  }}
                                />
                                {editCourse.toEdit === course.id && (
                                  <div
                                    className="options-menu"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                    }}
                                  >
                                    <div
                                      className="item"
                                      onClick={() => {
                                        localStorage.setItem(
                                          "courseToEdit",
                                          JSON.stringify(course)
                                        )
                                        navigate(
                                          `:${course?.title.toLowerCase()}__${
                                            course.id
                                          }/edit`
                                        )
                                      }}
                                    >
                                      {" "}
                                      <FiEdit3 /> Edit
                                    </div>
                                    <div
                                      className="item"
                                      onClick={() => {
                                        navigate(
                                          `${course?.title.toLowerCase()}__${
                                            course.id
                                          }/students`
                                        )
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
                                          lessonToDelete: course,
                                        })
                                      }}
                                    >
                                      {" "}
                                      <SlTrash />
                                      Delete
                                    </div>
                                  </div>
                                )}
                              </span>
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
          isLoading={isLoading}
          itemToDelete={`course; ${deleteCourse?.lessonToDelete?.title}`}
          handleDelete={() => {
            console.log(deleteCourse?.lessonToDelete?.id)
            console.log(deleteCourse?.lessonToDelete)
            handleDeleteCourse(deleteCourse?.lessonToDelete?.id)
          }}
        />
      </div>
    </>
  )
}
