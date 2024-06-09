import Head from "../../../layout/head/Head"
import LayoutWithSidebar from "../../../layout/template/LayoutWithSidebar"
import upload from "../../../assets/icons/upload.svg"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { axiosInstance } from "../../../services/AxiosInstance"
import { Spinner } from "react-bootstrap"
import { excludeKey } from "../../../utils/excludeKey"
import { useContext } from "react"
import { ServiceManager } from "../../../context/ServiceContext"
import { UploadToCloud } from "../../../services/UploadToCloud"
import { HandleNotif } from "../../../services/NotifHandler"

export default function AddCourse() {
  const navigate = useNavigate()
  const { subject } = useParams()
  const [emptyField, setEmptyField] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState({
    id: "",
    title: "",
  })
  const { getSubjectsCourses } = useContext(ServiceManager)
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    description: "",
    cover_photo: "",
    status: "0",
    cover_photo_to_display: "",
  })
  const [descTxtLen, setDescTxtLen] = useState(0)

  // const [CourseLessons, setCourseLessons] = useState([]);
  useEffect(() => {
    setSelectedSubject({
      ...selectedSubject,
      id: subject.split("__")[1],
      title: subject.split("__")[0],
    })
    getSubjectsCourses(subject.split("__")[1])
  }, [])

  async function CreateSubjectCourse() {
    setIsLoading(true)

    const imageLink = await UploadToCloud(courseDetails.cover_photo)

    if (imageLink) {
      const updatedCourseDetails = {
        ...courseDetails,
        cover_photo: imageLink,
      }
      setCourseDetails(updatedCourseDetails)

      try {
        await axiosInstance
          .post(
            `/admin/${selectedSubject.id}/courses`,
            excludeKey(updatedCourseDetails, "cover_photo_to_display")
          )
          .then((resp) => {
            getSubjectsCourses(subject.split("__")[1])
            setIsLoading(false)
            setCourseDetails({
              title: "",
              description: "",
              cover_photo: "",
            })
            if (resp) {
              HandleNotif({
                text: "Course Added Successfully",
                type: "success",
              })
              navigate(`/manager/courses/${subject.split(":")[1]}`)
            }
          })
      } catch (error) {
        console.error(error)

        setIsLoading(false)
      }
    }
  }

  function handleValidation() {
    if (
      !courseDetails.title ||
      !courseDetails.description ||
      !courseDetails.cover_photo
    ) {
      setEmptyField(true)
    } else {
      setEmptyField(false)
      CreateSubjectCourse()
    }
  }

  return (
    <>
      <Head title="Add Course | Subject | Course Manager" />

      <LayoutWithSidebar pageTitle={"Course Manager"}>
        <header>
          <div className="breadcrumb mb-3 mt-">
            <div className="location">Subjects</div>
            <div className="sign">&gt;</div>
            <div className="location"> Chemistry</div>
            <div className="sign">&gt;</div>
            <div className="location"> Add new course</div>
          </div>
        </header>

        <div className="add-subject-content bg-white p-3 rounded">
          <header>
            <h5>Add New Course</h5>
          </header>

          <div className="d-flex gap-5 align-items-center">
            <div className="input-section w-50">
              <label htmlFor="title">
                Course Title<sup className="text-danger">*</sup>
              </label>
              <div className="input">
                <input
                  type="text"
                  id="title"
                  placeholder="Enter course title"
                  value={courseDetails.title}
                  onChange={(e) => {
                    setCourseDetails({
                      ...courseDetails,
                      title: e.target.value,
                    })
                  }}
                />
                {emptyField && !courseDetails.title && (
                  <div className="error">Title is required</div>
                )}
              </div>
            </div>

            <div className="input-section w-50">
              <label htmlFor="title">Course Subject</label>
              <div className="input">
                <input
                  type="text"
                  id="title"
                  disabled
                  value={selectedSubject?.title?.substring(1)}
                  placeholder="Enter subject title"
                />
              </div>
            </div>
          </div>

          <div className="input-section">
            <label htmlFor="description">Description</label>
            <div className="input">
              <textarea
                name=""
                maxLength={150}
                id="description"
                cols="30"
                rows="3"
                placeholder="Not more than 150 characters"
                value={courseDetails.description}
                onChange={(e) => {
                  setCourseDetails({
                    ...courseDetails,
                    description: e.target.value,
                  })
                  setDescTxtLen(e.target.value.length)
                }}
              ></textarea>
              {emptyField && !courseDetails.description && (
                <div className="error">Description is required</div>
              )}
            </div>
            <span className="text-count">{descTxtLen}/150</span>
          </div>

          <div className="mb-2">
            <label htmlFor="">Upload cover photo</label>
          </div>

          <div className="upload-section pointer">
            {courseDetails.cover_photo_to_display ? (
              <label htmlFor="uploadImage" className="preview-img">
                <img
                  src={courseDetails.cover_photo_to_display}
                  alt=""
                  id="uploadImage"
                  className="preview-img"
                />
                <input
                  type="file"
                  id="uploadImage"
                  // value={courseDetails.cover_photo}
                  onChange={(e) => {
                    setCourseDetails({
                      ...courseDetails,
                      cover_photo: e.target.files[0],
                      cover_photo_to_display: URL.createObjectURL(
                        e.target.files[0]
                      ),
                    })
                  }}
                />
              </label>
            ) : (
              <div>
                <center>
                  <img src={upload} draggable="false" alt="" />{" "}
                </center>
                <label htmlFor="uploadImage">
                  Drop your image here or, Browse [png, jpg, jpeg]
                </label>
                <input
                  type="file"
                  id="uploadImage"
                  // value={courseDetails.cover_photo}
                  onChange={(e) => {
                    setCourseDetails({
                      ...courseDetails,
                      cover_photo: e.target.files[0],
                      cover_photo_to_display: URL.createObjectURL(
                        e.target.files[0]
                      ),
                    })
                  }}
                />
                {emptyField && !courseDetails.cover_photo && (
                  <div className="error">Cover photo is required</div>
                )}
              </div>
            )}
          </div>

          <div className="bottom d-flex justify-content-between align-items-center my-3">
            <div className="status-section mt-3">
              <div className="">Status</div>
              <div className="toggle-container ">
                <input
                  type="checkbox"
                  id={"course-status"}
                  className="toggle-input"
                  defaultChecked={false}
                  onChange={(e) => {
                    setCourseDetails({
                      ...courseDetails,
                      status: e.target.checked ? "1" : "0",
                    })
                  }}
                />
                <label htmlFor={"course-status"} className="toggle-label">
                  <div className="toggle-slider"></div>
                </label>
              </div>
            </div>

            <button
              className="bordered-button"
              style={{ width: "fit-content" }}
              onClick={() => {
                handleValidation()
              }}
            >
              {isLoading ? (
                <Spinner size="sm" variant="black" />
              ) : (
                " Upload Course"
              )}
            </button>
          </div>
        </div>

        {/* cannot create lessons from here because we cant bind course ID until course is created */}
        {/* <div className="my-4">
          <Lessons lessonsList={CourseLessons} />
        </div> */}
      </LayoutWithSidebar>
    </>
  )
}
