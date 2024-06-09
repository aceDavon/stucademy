import { Modal, Spinner } from "react-bootstrap"
import upload from "../../../assets/icons/upload.svg"
import { axiosInstance } from "../../../services/AxiosInstance"
import { useContext, useState } from "react"
import { ServiceManager } from "../../../context/ServiceContext"
import { HandleNotif } from "../../../services/NotifHandler"
import { validateSvg } from "../../../utils/validators"

export default function AddIcon({ showState, setShowState }) {
  const [emptyField, setEmptyField] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [subjectDetails, setSubjectDetails] = useState({
    name: "",
    icon: "",
    icon_to_display: "",
  })

  const { getCourseIcons } = useContext(ServiceManager)

  async function addIcon() {
    setIsLoading(true)
    const formData = new FormData()
    formData.append("name", subjectDetails.name)

    if (subjectDetails.icon && validateSvg(subjectDetails.icon)) {
      formData.append("url", subjectDetails.icon)

      try {
        await axiosInstance
          .post("/dashboard/course/icons", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            getCourseIcons()
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
    } else {
      HandleNotif({
        text: "Invalid icon format",
        type: "error",
      })
      setIsLoading(false)
    }

    if (!validateSvg(subjectDetails.featured_icon)) setEmptyField(true)
  }

  function handleValidation() {
    if (
      !subjectDetails.name ||
      !subjectDetails.icon ||
      !validateSvg(subjectDetails.icon)
    ) {
      setEmptyField(true)
    } else {
      addIcon()
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
          Add Course Icon
        </Modal.Header>
        <Modal.Body className="modalContent p-4 add-subject-content">
          <div className="input-section">
            <label htmlFor="title">
              Icon Title<sup className="text-danger">*</sup>
            </label>
            <div className="input">
              <input
                type="text"
                id="name"
                placeholder="Enter Icon name"
                value={subjectDetails.name}
                onChange={(e) => {
                  setSubjectDetails({
                    ...subjectDetails,
                    name: e.target.value,
                  })
                }}
              />
              {emptyField && !subjectDetails.title && (
                <div className="error">Title is required</div>
              )}
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="">Upload course icon</label>
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
                      icon: e.target.files[0],
                      icon_to_display: URL.createObjectURL(e.target.files[0]),
                    })
                  }}
                />
                {emptyField &&
                  subjectDetails.icon &&
                  !validateSvg(subjectDetails.icon) && (
                    <div className="error">
                      Course Icon should be an svg icon
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
                      icon: e.target.files[0],
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
              {isLoading ? <Spinner size="sm" variant="white" /> : " Add Icon"}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
