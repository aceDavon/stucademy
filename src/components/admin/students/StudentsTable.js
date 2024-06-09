import { BiSortAlt2 } from "react-icons/bi"
import Head from "../../../layout/head/Head"
import LayoutWithSidebar from "../../../layout/template/LayoutWithSidebar"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import DeletePrompt from "../../../components/admin/courses/DeletePrompt"
import EmptySubjectCatalogue from "../../../components/empty_states/EmptySubjectCatalogue"
import { axiosInstance } from "../../../services/AxiosInstance"
import { handleFilter } from "../../../utils/searchFilter"
import { HandleNotif } from "../../../services/NotifHandler"

export default function StudentsTable() {
  const navigate = useNavigate()
  const [editCourse, setEditCourse] = useState({
    toggle: false,
    toEdit: "",
  })

  const [deleteCourse, setDeleteCourse] = useState({
    deletePrompt: false,
    lessonToDelete: "",
  })
  const [studentsList, setStudentsList] = useState([])
  const [studentsListUnaltered, setStudentsListUnaltered] = useState([])

  useEffect(() => {
    getStudentsList()
  }, [])

  async function getStudentsList() {
    try {
      await axiosInstance.get("/admin/students").then((resp) => {
        const { students } = resp.data
        setStudentsList(students)
        setStudentsListUnaltered(students)
      })
    } catch (error) {
      HandleNotif({
        text: error.message,
        type: "error",
      })
    }
  }

  function handleToggleEdit(courseId) {
    setEditCourse({
      ...editCourse,
      toggle: !editCourse.toggle,
      toEdit: courseId,
    })
  }

  function handleDeleteCourse() {
    console.log("course deleted")
  }

  return (
    <>
      <Head title="Subject | Course Manager" />

      <LayoutWithSidebar pageTitle={"Students"}>
        <div
          className="course-manager-container"
          onClick={() => setEditCourse({ ...editCourse, toEdit: "" })}
        >
          <b>All Students ({studentsList?.length})</b>
          <div className="header">
            <div className="search-section">
              <input
                type="search"
                placeholder="Search"
                onChange={(e) =>
                  setStudentsList(
                    handleFilter(studentsListUnaltered, e.target.value)
                  )
                }
              />
            </div>

            <div className="filter-button">
              <div className="select">
                <select
                  name=""
                  id=""
                  onChange={(e) => handleFilter(e.target.value)}
                >
                  <option value="all">Filter:All</option>
                  <option value="active">Filter:Active</option>
                </select>
              </div>
            </div>
          </div>

          {studentsList?.length ? (
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
                  </tr>
                </thead>

                <tbody>
                  {studentsList.length
                    ? studentsList.map((student) => {
                        return (
                          <tr
                            key={student.id}
                            onClick={() => {
                              navigate(
                                `:${student.username}__${student.id}/profile`
                              )
                            }}
                          >
                            <td> {student.id} </td>
                            <td>
                              <div className="profile">
                                <div className="avatar">
                                  <img src={student.image} alt={student.name} />
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
