import { useContext, useEffect, useState } from "react"
import AddSubject from "../../../components/admin/courses/AddSubject"
import Head from "../../../layout/head/Head"
import LayoutWithSidebar from "../../../layout/template/LayoutWithSidebar"
import "../../../styles/comoponents_pages/courseManager.scss"
import PracticeLessonsUploaded from "./PracticeLessonsUploaded"
import PracticeLessonsDraft from "./PracticeLessonsDraft"
import { BreadCrumb } from "../../BreadCrumb"
import { useParams } from "react-router-dom"
import { ServiceManager } from "../../../context/ServiceContext"
import { handleFilter } from "../../../utils/searchFilter"

export default function PracticeLessons() {
  const { subject } = useParams()
  const [showAddSubject, setShowAddSubject] = useState(false)
  const [showLesson, setShowLesson] = useState({
    draft: false,
    uploaded: true,
  })
  const {
    getSubjectsCourses,
    setSubjectsCourses,
    subjectsCourses: courseList = [],
  } = useContext(ServiceManager)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getSubjectsCourses(subject.split("__")[1])
  }, [])

  useEffect(() => {
    setCourses(courseList)
  }, [courseList])

  return (
    <>
      <Head title="Course Manager" />

      <LayoutWithSidebar pageTitle={"Practice Question Manager"}>
        <div className="course-manager-container">
          <header>
            <div className="breadcrumb mb-5 mt-3">
              <BreadCrumb />
            </div>
          </header>

          <div className="header">
            <nav className="lesson-navigator">
              <span
                onClick={() =>
                  setShowLesson({ ...showLesson, draft: true, uploaded: false })
                }
                className={showLesson.draft ? "active-navigator" : "button"}
              >
                View Draft (12){" "}
              </span>
              <span
                onClick={() =>
                  setShowLesson({ ...showLesson, draft: false, uploaded: true })
                }
                className={showLesson.uploaded ? "active-navigator" : "button"}
              >
                {`Uploaded Lessons (${courses.length})`}
              </span>
            </nav>
            <div className="filter-button w-50">
              <div className="search-section w-75">
                <input
                  type="search"
                  placeholder="Search"
                  onChange={(e) =>
                    setCourses(handleFilter(courseList, e.target.value))
                  }
                />
              </div>
              <div className="select d-flex">
                Filter:
                <select
                  name=""
                  id=""
                  onChange={(e) =>
                    setCourses(
                      handleFilter(courseList, e.target.value, "filter")
                    )
                  }
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {showLesson.uploaded ? (
            <PracticeLessonsUploaded
              courseList={courseList}
              courses={courses}
              setSubjectsCourses={setSubjectsCourses}
            />
          ) : (
            <PracticeLessonsDraft />
          )}
        </div>
      </LayoutWithSidebar>

      <div className="modals">
        {/* <AddSubject show={showAddSubject} onHide={()=>setShowAddSubject(false)} /> */}
        <AddSubject
          showState={showAddSubject}
          setShowState={() => setShowAddSubject(false)}
        />
      </div>
    </>
  )
}
