import { Modal, Spinner } from "react-bootstrap";
import upload from "../../../assets/icons/upload.svg";
import { useState } from "react";
import { axiosInstance } from "../../../services/AxiosInstance";
import { excludeKey } from "../../../utils/excludeKey";
import { UploadToCloud } from "../../../services/UploadToCloud";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ServiceManager } from "../../../context/ServiceContext";

export default function AddLesson({ showState, setShowState }) {
  const { getCourseLessons } = useContext(ServiceManager);

  const [emptyField, setEmptyField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { course } = useParams();
  const [lessonDetails, setLessonDetails] = useState({
    title: "",
    description: "",
    cover_photo: "",
    youtube_link: "",
    cover_photo_to_display: "",
  });
  function handleValidation() {
    if (
      !lessonDetails.title ||
      !lessonDetails.description ||
      !lessonDetails.cover_photo
    ) {
      setEmptyField(true);
    } else {
      setEmptyField(false);
      CreateCourseLesson();
    }
  }

  async function CreateCourseLesson() {
    setIsLoading(true);

    const imageLink = await UploadToCloud(lessonDetails.cover_photo);

    if (imageLink) {
      const updatedCourseDetails = {
        ...lessonDetails,
        cover_photo: imageLink,
      };
      setLessonDetails(updatedCourseDetails);

      try {
        await axiosInstance
          .post(
            `/admin/${course.split("__")[1]}/lessons`,
            excludeKey(updatedCourseDetails, "cover_photo_to_display")
          )
          .then((resp) => {
            setIsLoading(false);
            setLessonDetails({
              title: "",
              description: "",
              youtube_link: "",
              cover_photo: "",
            });
          });
        getCourseLessons(course.split("__")[1]);
        setShowState();

      } catch (error) {
        console.log(error);

        setIsLoading(false);
      }
    }
  }

  return (
    <div className="add-subject-container ">
      <Modal
        show={showState}
        onHide={() => setShowState()}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add-subject-header" closeButton>
          Add Lesson
        </Modal.Header>
        <Modal.Body className="modalContent p-4 add-subject-content">
          <div className="input-section">
            <label htmlFor="title">
              Lesson Title<sup className="text-danger">*</sup>
            </label>
            <div className="input">
              <input
                type="text"
                id="title"
                value={lessonDetails.title}
                onChange={(e) => {
                  setLessonDetails({
                    ...lessonDetails,
                    title: e.target.value,
                  });
                }}
                placeholder="Enter subject title"
              />
            </div>
          </div>
          <div className="input-section">
            <label htmlFor="description">Lesson Description</label>
            <div className="input">
              <textarea
                name=""
                maxLength={150}
                id="description"
                cols="30"
                rows="3"
                value={lessonDetails.description}
                onChange={(e) => {
                  setLessonDetails({
                    ...lessonDetails,
                    description: e.target.value,
                  });
                }}
                placeholder="Not more than 150 characters"
              ></textarea>
            </div>
          </div>

          <div className="input-section">
            <label htmlFor="youtube-link">
              YouTube Link<sup className="text-danger">*</sup>
            </label>
            <div className="input">
              <input
                value={lessonDetails.youtube_link}
                onChange={(e) => {
                  setLessonDetails({
                    ...lessonDetails,
                    youtube_link: e.target.value,
                  });
                }}
                type="text"
                id="youtube-link"
                placeholder="Enter YouTube Link"
              />
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="">Upload cover photo</label>
          </div>
          <div className="upload-section pointer">
            {lessonDetails.cover_photo_to_display ? (
              <label htmlFor="uploadImage" className="preview-img">
                <img
                  src={lessonDetails.cover_photo_to_display}
                  alt=""
                  id="uploadImage"
                  className="preview-img"
                />
                <input
                  type="file"
                  id="uploadImage"
                  // value={lessonDetails.cover_photo}
                  onChange={(e) => {
                    setLessonDetails({
                      ...lessonDetails,
                      cover_photo: e.target.files[0],
                      cover_photo_to_display: URL.createObjectURL(
                        e.target.files[0]
                      ),
                    });
                  }}
                />
              </label>
            ) : (
              <div>
                <center>
                  <img src={upload} draggable="false" alt="" />{" "}
                </center>
                <label htmlFor="uploadImage">
                  Drop your image here or, Browse
                </label>
                <input
                  type="file"
                  id="uploadImage"
                  // value={lessonDetails.cover_photo}
                  onChange={(e) => {
                    setLessonDetails({
                      ...lessonDetails,
                      cover_photo: e.target.files[0],
                      cover_photo_to_display: URL.createObjectURL(
                        e.target.files[0]
                      ),
                    });
                  }}
                />
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="buttons">
            <button
              onClick={() => {
                setShowState();
              }}
            >
              Cancel
            </button>
            {/* <button>Add Lesson</button> */}
            <button
              onClick={() => {
                handleValidation();
              }}
            >
              {isLoading ? (
                <Spinner size="sm" variant="black" />
              ) : (
                " Add Lesson"
              )}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
