import { Modal, Spinner } from "react-bootstrap"
import upload from "../../../assets/icons/upload.svg"
import { axiosInstance } from "../../../services/AxiosInstance"
import { useContext, useState } from "react"
import { ServiceManager } from "../../../context/ServiceContext"
import { UploadToCloud } from "../../../services/UploadToCloud"
import { HandleNotif } from "../../../services/NotifHandler"
import { validateSvg } from "../../../utils/validators"

export default function AddSubject({ showState, setShowState }) {
  const [emptyField, setEmptyField] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [subjectDetails, setSubjectDetails] = useState({
    title: "",
    description: "",
    cover_photo: "",
    cover_photo_to_display: "",
  })
  const [descTxtLen, setDescTxtLen] = useState(0)

  const { getAllSubjects } = useContext(ServiceManager)

  async function addSubject() {
    setIsLoading(true)
    const imageLink = await UploadToCloud(subjectDetails.cover_photo)
    const iconLink = await UploadToCloud(subjectDetails.featured_icon)
    setSubjectDetails({
      ...subjectDetails,
      cover_photo: imageLink,
      featured_icon: iconLink,
    })
    const formData = new FormData()
    formData.append("title", subjectDetails.title)
    formData.append("description", subjectDetails.description)
    if (imageLink && iconLink && validateSvg(subjectDetails.featured_icon)) {
      formData.append("cover_photo", imageLink)
      formData.append("featured_icon", iconLink)

      try {
        await axiosInstance
          .post("/admin/subjects", {
            description: subjectDetails.description,
            title: subjectDetails.title,
            cover_photo: imageLink,
            featured_icon: iconLink,
          })
          .then((_) => {
            getAllSubjects()
            setIsLoading(false)
            setShowState()
          })
      } catch (error) {
        HandleNotif({
          text: error.message,
          type: "error",
        })
        setIsLoading(false)
      }
    }

    if (!validateSvg(subjectDetails.featured_icon)) setEmptyField(true)
  }

  function handleValidation() {
    if (
      !subjectDetails.title ||
      !subjectDetails.description ||
      !subjectDetails.cover_photo ||
      !subjectDetails.featured_icon ||
      !validateSvg(subjectDetails.featured_icon)
    ) {
      setEmptyField(true)
    } else {
      addSubject()
    }
  }

  return (
    <div className="add-subject-container">
      <Modal
        show={showState}
        onHide={() => {
          setShowState()
          setEmptyField(false)
        }}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add-subject-header" closeButton>
          Add Subject
        </Modal.Header>
        <Modal.Body className="modalContent p-4 add-subject-content">
          <div className="input-section">
            <label htmlFor="title">
              Subject Title<sup className="text-danger">*</sup>
            </label>
            <div className="input">
              <input
                type="text"
                id="title"
                placeholder="Enter subject title"
                value={subjectDetails.title}
                onChange={(e) => {
                  setSubjectDetails({
                    ...subjectDetails,
                    title: e.target.value,
                  })
                }}
              />
              {emptyField && !subjectDetails.title && (
                <div className="error">Title is required</div>
              )}
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
                value={subjectDetails.description}
                onChange={(e) => {
                  setSubjectDetails({
                    ...subjectDetails,
                    description: e.target.value,
                  })
                  setDescTxtLen(e.target.value.length)
                }}
              ></textarea>
              {emptyField && !subjectDetails.description && (
                <div className="error">Description is required</div>
              )}
            </div>
            <span className="text-count">{descTxtLen}/150</span>
          </div>

          <div className="mb-2">
            <label htmlFor="">Upload cover photo</label>
          </div>
          <div className="upload-section pointer">
            {subjectDetails.cover_photo_to_display ? (
              <label htmlFor="uploadImage" className="preview-img">
                <img
                  src={subjectDetails.cover_photo_to_display}
                  alt=""
                  id="uploadImage"
                  className="preview-img"
                />
                <input
                  type="file"
                  id="uploadImage"
                  onChange={(e) => {
                    setSubjectDetails({
                      ...subjectDetails,
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
                  onChange={(e) => {
                    setSubjectDetails({
                      ...subjectDetails,
                      cover_photo: e.target.files[0],
                      cover_photo_to_display: URL.createObjectURL(
                        e.target.files[0]
                      ),
                    })
                  }}
                />
                {emptyField && !subjectDetails.cover_photo && (
                  <div className="error">Cover photo is required</div>
                )}
              </div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="">Upload subject icon</label>
          </div>
          <div className="upload-section pointer">
            {subjectDetails.icon_to_display ? (
              <label htmlFor="uploadImage" className="preview-img">
                <img
                  src={subjectDetails.icon_to_display}
                  alt=""
                  id="uploadImage"
                  className="preview-img"
                />
                <input
                  type="file"
                  id="uploadImage"
                  onChange={(e) => {
                    setSubjectDetails({
                      ...subjectDetails,
                      featured_icon: e.target.files[0],
                      icon_to_display: URL.createObjectURL(e.target.files[0]),
                    })
                  }}
                />
                {emptyField &&
                  subjectDetails.featured_icon &&
                  !validateSvg(subjectDetails.featured_icon) && (
                    <div className="error">
                      Subject Icon should be an svg icon
                    </div>
                  )}
              </label>
            ) : (
              <div>
                <center>
                  <img src={upload} draggable="false" alt="" />{" "}
                </center>
                <label htmlFor="uploadImage">
                  Drop your icons here or, Browse [svg icons only]
                </label>
                <input
                  type="file"
                  id="uploadImage"
                  onChange={(e) => {
                    setSubjectDetails({
                      ...subjectDetails,
                      featured_icon: e.target.files[0],
                      icon_to_display: URL.createObjectURL(e.target.files[0]),
                    })
                  }}
                />
                {emptyField && !subjectDetails.featured_icon && (
                  <div className="error">Subject Icon is required</div>
                )}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="buttons">
            <button
              onClick={() => {
                setShowState()
              }}
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={async () => {
                handleValidation()
              }}
            >
              {isLoading ? (
                <Spinner size="sm" variant="white" />
              ) : (
                " Add Subject"
              )}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
