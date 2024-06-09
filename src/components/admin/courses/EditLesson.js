import { Modal, Spinner } from "react-bootstrap";
import camera from "../../../assets/icons/camera.svg";
import thumbnail from "../../../assets/images/courses/chemistry.jpg";
import { useState } from "react";
import { useEffect } from "react";
import { UploadToCloud } from "../../../services/UploadToCloud";
import { axiosInstance } from "../../../services/AxiosInstance";
import { excludeKey } from "../../../utils/excludeKey";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ServiceManager } from "../../../context/ServiceContext";

export default function EditLesson({ showState, setShowState, lessonToEdit }) {
  const [lesson, setLesson] = useState(lessonToEdit);
  const [isLoading, setIsLoading] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const { course } = useParams();
  const { getCourseLessons } = useContext(ServiceManager);


  useEffect(() => {
    setLesson(lessonToEdit); 
  }, [lessonToEdit]);

  function handleValidation() {
    if (!lesson.title || !lesson.description || !lesson.cover_photo) {
      setEmptyField(true);
    } else {
      setEmptyField(false);
      EditCourseLesson();
    }
  }
  async function EditCourseLesson() {
    setIsLoading(true);
    let imageLink;

    if (lessonToEdit.cover_photo !== lesson.cover_photo) {
      imageLink = await UploadToCloud(lesson.cover_photo);
    }

    if (imageLink) {
      const updatedCourseDetails = {
        ...lesson,
        cover_photo: imageLink,
      };
      setLesson(updatedCourseDetails);
    }

    try {
      await axiosInstance
        .put(
          `/admin/lesson/${lessonToEdit.id}`,
          excludeKey(lesson, "cover_photo_to_display")
        )
        .then((resp) => {
          console.log(resp);
          setIsLoading(false);
          setLesson({
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
          Edit Lesson
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
                value={lesson?.title}
                onChange={(e) =>
                  setLesson({ ...lesson, title: e.target.value })
                }
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
                value={lesson?.description}
                onChange={(e) =>
                  setLesson({ ...lesson, description: e.target.value })
                }
                placeholder="Not more than 150 characters"
              ></textarea>
            </div>
          </div>

          <div className="input-section">
            <label htmlFor="title">
              YouTube Link<sup className="text-danger">*</sup>
            </label>
            <div className="input">
              <input
                type="text"
                id="title"
                value={lesson?.youtube_link}
                onChange={(e) =>
                  setLesson({ ...lesson, youtube_link: e.target.value })
                }
                placeholder="Enter YouTube Link"
              />
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="">Upload cover photo</label>
          </div>
          <div className="upload-section preview-edit-image-section pointer">
            <img
              src={lesson.cover_photo || lesson.cover_photo_to_display}
              alt=""
              id="uploadImage"
              className="preview-img"
            />
            <div className="change-hover">
              <center>
                <img src={camera} draggable="false" alt="" />{" "}
              </center>
              <label htmlFor="uploadImage">
                Drop your image here or, Browse
              </label>
              <input
                type="file"
                id="uploadImage"
                // value={lesson.cover_photo}
                onChange={(e) => {
                  setLesson({
                    ...lesson,
                    cover_photo: e.target.files[0],
                    cover_photo_to_display: URL.createObjectURL(
                      e.target.files[0]
                    ),
                  });
                }}
              />
            </div>
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
            <button onClick={() => handleValidation()}>
              {" "}
              {isLoading ? (
                <Spinner size="sm" variant="black" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
