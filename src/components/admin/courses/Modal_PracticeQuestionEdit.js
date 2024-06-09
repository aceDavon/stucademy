import { Modal } from "react-bootstrap"; 
import camera from "../../../assets/icons/camera.svg";
import thumbnail from "../../../assets/images/courses/chemistry.jpg"

export default function ModalPracticeQuestionEdit({ showState, setShowState }) {
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
          Edit question
        </Modal.Header>
        <Modal.Body className="modalContent p-4 add-subject-content">
          <div className="input-section">
            <label htmlFor="title">
              Question<sup className="text-danger">*</sup>
            </label>
            <div className="input">
              <input type="text" id="title" value={"When the value of enerfy become zero for an element?"} />
            </div>
          </div>


          <div className="mb-2">
            <label htmlFor="">Upload Image (optional) </label>
          </div>
          <div className="upload-section preview-edit-image-section pointer">
            <img src={thumbnail} alt="" />
            <div className="change-hover">
              <center>
                <img src={camera} draggable="false" alt="" />{" "}
              </center>
              <label htmlFor="uploadImage">
                Drop your image here or, Browse
              </label>
              <input type="file" id="uploadImage" />
            </div>
          </div>



          <div className="d-flex gap-3 align-items-center">
              <div className="input-section mb-0 w-50">
                <label htmlFor="option1">Option 1</label>
                <div className="input">
                  <input type="text" id="option1" defaultValue={"Around the nuclues"} placeholder="" />
                </div>
              </div>

              <div className="input-section mb-0  w-50">
                <label htmlFor="option2">Option 2</label>
                <div className="input">
                  <input type="text" id="option2" defaultValue={"Around the nuclues"} placeholder="" />
                </div>
              </div>
            </div>

            <div className="d-flex gap-2 align-items-center">
              <div className="input-section w-50">
                <label htmlFor="option3">Option 3</label>
                <div className="input">
                  <input type="text" id="option3" defaultValue={"Around the nuclues"} placeholder="" />
                </div>
              </div>

              <div className="input-section w-50">
                <label htmlFor="option4">Option 4</label>
                <div className="input">
                  <input type="text" id="option4" defaultValue={"Around the nuclues"} placeholder="" />
                </div>
              </div>
            </div>









          <div className="input-section">
            <label htmlFor="description">Solution</label>
            <div className="input ">
              <textarea
              className="bg-primary-10"
                name=""
                maxLength={150}
                id="description"
                cols="30"
                rows="3"
                disabled
                value={
                  "Far from the nucleus"
                }
                placeholder="Not more than 150 characters"
              ></textarea>
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
            <button>Save Changes</button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
