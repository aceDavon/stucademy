import Head from "../../../layout/head/Head"
import LayoutWithSidebar from "../../../layout/template/LayoutWithSidebar"
import camera from "../../../assets/icons/camera.svg"
import Lessons from "./Lessons"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import { BreadCrumb } from "../../BreadCrumb"
import { UploadToCloud } from "../../../services/UploadToCloud"
import { HandleNotif } from "../../../services/NotifHandler"
import { axiosInstance } from "../../../services/AxiosInstance"
import { Exception } from "sass"

export default function EditCourse() {
  const navigate = useNavigate()
  const [courseToEdit, setCourseToEdit] = useState({})
  const [courseSubject, setCourseSubject] = useState("")
  const [descTxtLen, setDescTxtLen] = useState(0)
  const { subject } = useParams()
  const [isLoading, setIsLoading] = useState(false)

  const handleValidation = async () => {
    for (const field of Object.values(courseToEdit)) {
      if (field === "") {
        HandleNotif({
          text: "Please ensure to fill all required fields on the form",
          type: "error",
        })
        console.log(courseToEdit)
        return
      }
    }

    let imagePath
    if (courseToEdit.cover_photo) {
      imagePath = await UploadToCloud(courseToEdit.cover_photo)
    }
    setIsLoading(true)
    const formData = new FormData()
    if (imagePath) {
      Object.keys(courseToEdit).forEach((key) =>
        key === "cover_photo"
          ? formData.append("cover_photo", courseToEdit.cover_photo)
          : formData.append(key, courseToEdit[key])
      )
    }
    handleUpdate(formData)
  }

  const handleUpdate = (data) => {
    try {
      axiosInstance
        .post(`/admin/course/${courseToEdit.id}?_method=PUT`, data)
        .then((resp) => {
          setIsLoading(false)
          if (resp.data) {
            HandleNotif({
              text: "Course updated successfully",
              type: "success",
            })
            navigate(-1)
          } else {
            throw new Exception()
          }
        })
    } catch (error) {
      HandleNotif({
        text: error.message,
        type: "error",
      })
    }
  }
  useEffect(() => {
    const localCourse = localStorage.getItem("courseToEdit")
    if (localCourse) {
      setCourseToEdit(JSON.parse(localCourse))

      setCourseSubject(subject.split("__")[0])
    }
  }, [])

  return (
    <>
      <Head title="Edit Course | Subject | Course Manager" />

      <LayoutWithSidebar pageTitle={"Course Manager"}>
        <BreadCrumb course={courseToEdit} />

        <div className="add-subject-content bg-white p-3 rounded">
          <header>
            <h5>Edit Course Details</h5>
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
                  onChange={(e) =>
                    setCourseToEdit((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  value={courseToEdit?.title}
                />
              </div>
            </div>

            <div className="input-section w-50">
              <label htmlFor="title">Course Subject</label>
              <div className="input">
                <input
                  type="text"
                  id="title"
                  disabled
                  value={courseSubject?.substring(1)}
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
                onChange={(e) => {
                  setCourseToEdit((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                  setDescTxtLen(e.target.value.length)
                }}
                placeholder="Not more than 150 characters"
                defaultValue={courseToEdit?.description}
              ></textarea>
            </div>
            <span className="text-count">{descTxtLen}/150</span>
          </div>

          <div className="mb-2">
            <label htmlFor="">Upload cover photo</label>
          </div>
          <div className="upload-section preview-edit-image-section pointer">
            <img src={courseToEdit?.cover_photo} alt="" />
            <div className="change-hover">
              <center>
                <img src={camera} draggable="false" alt="" />{" "}
              </center>
              <label htmlFor="uploadImage">
                Drop your image here or, Browse [png, jpg, jpeg]
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setCourseToEdit((prev) => ({
                    ...courseToEdit,
                    cover_photo: e.target.files[0],
                  }))
                }
                id="uploadImage"
              />
            </div>
          </div>

          <div className="status-section mt-3">
            <div className="">Status</div>
            <div className="toggle-container ">
              <input
                type="checkbox"
                id={"course-status"}
                className="toggle-input"
                checked={courseToEdit?.status === "0" ? false : true}
                onChange={() =>
                  setCourseToEdit(() => ({
                    ...courseToEdit,
                    status:
                      courseToEdit.status && courseToEdit.status === "1"
                        ? "0"
                        : "1",
                  }))
                }
              />
              <label htmlFor={"course-status"} className="toggle-label">
                <div className="toggle-slider"></div>
              </label>
            </div>
          </div>
          <button
            className="bordered-button"
            style={{ width: "fit-content", marginTop: "12px" }}
            onClick={() => {
              handleValidation()
            }}
          >
            {isLoading ? (
              <Spinner size="sm" variant="black" />
            ) : (
              " Update Course"
            )}
          </button>
        </div>
        <Lessons />
      </LayoutWithSidebar>
    </>
  )
}
