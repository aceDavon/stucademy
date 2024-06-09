import Head from "../../../layout/head/Head";
import LayoutWithSidebar from "../../../layout/template/LayoutWithSidebar";
import upload from "../../../assets/icons/upload.svg";
import { BiSortAlt2 } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { PiPlayFill } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import AddLesson from "./AddLesson";
import EditLesson from "./EditLesson";
import DeletePrompt from "./DeletePrompt";
import { useNavigate } from "react-router-dom";

export default function EditDraftQuestion() {
  const [showSaved, setShowSaved] = useState(false);
  const [showEditLesson, setShowEditLesson] = useState(false);
  const navigate = useNavigate();

  const [deleteLesson, setDeleteLesson] = useState({
    deletePrompt: false,
    lessonToDelete: "",
  });

  function handleDeleteQuestion() {
    console.log("lesson deleted");
  }
  return (
    <div className="add-practice-question-container">
      <Head title="Add question | Practice Course" />

      <LayoutWithSidebar pageTitle={"Practice Course"}>
        <header>
          <div className="breadcrumb mb-3 mt-">
            <div className="location">Subjects</div>
            <div className="sign">&gt;</div>
            <div className="location"> Chemistry</div>
            <div className="sign">&gt;</div>
            <div className="location"> Introduction to Chemistry</div>
            <div className="sign">&gt;</div>
            <div className="location"> Lessons</div>
            <div className="sign">&gt;</div>
            <div className="location"> Water</div>
            <div className="sign">&gt;</div>
            <div className="location"> Add Question</div>
          </div>
        </header>

        <div className="lessons-container">
            <header>
              <h5>Quesions</h5>
              <div className="buttons">
                <button>Save as Draft</button>
                <button>Upload</button>
              </div>
            </header>

            <section className="table-section">
              <div className="filter-area">
                <div className="rank-name">
                  <div>
                    S/N <BiSortAlt2 />
                  </div>
                </div>

                <div className="points">
                  Questions <BiSortAlt2 />
                </div>
              </div>

              <div className="record-section">
                <div className="item">
                  <section>
                    <div className="rank">1</div>

                    <div className="name">Introduction to Chemistry</div>
                  </section>

                  <div className="score">
                    <div
                      className="edit "
                      onClick={() => {
                        setShowEditLesson(true);
                      }}
                    >
                      {" "}
                      <FiEdit />{" "}
                    </div>
                    <div
                      className="delete "
                      onClick={() => {
                        setDeleteLesson({
                          ...deleteLesson,
                          deletePrompt: true,
                          lessonToDelete: "Chemistry",
                        });
                      }}
                    >
                      {" "}
                      <IoMdClose />{" "}
                    </div>
                  </div>
                </div>

                <div className="item">
                  <section>
                    <div className="rank">2</div>

                    <div className="name">Understanding Elements</div>
                  </section>

                  <div className="score">
                    <div
                      className="edit"
                      onClick={() => {
                        setShowEditLesson(true);
                      }}
                    >
                      {" "}
                      <FiEdit />{" "}
                    </div>
                    <div className="delete ">
                      {" "}
                      <IoMdClose />{" "}
                    </div>
                  </div>
                </div>

                <div className="item">
                  <section>
                    <div className="rank">3</div>

                    <div className="name">Chemistry of First Row Elements</div>
                  </section>

                  <div className="score">
                    <div className="edit ">
                      {" "}
                      <FiEdit />{" "}
                    </div>
                    <div className="delete ">
                      {" "}
                      <IoMdClose />{" "}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="modals">
              <DeletePrompt
                showState={deleteLesson.deletePrompt}
                setShowState={() =>
                  setDeleteLesson({ ...deleteLesson, deletePrompt: false })
                }
                itemToDelete={"question"}
                handleDelete={handleDeleteQuestion}
              />
            </div>
          </div>
 
          <div className="add-subject-content bg-white p-3 rounded"> 

            <div className="input-section">
              <label htmlFor="question">
                Question<sup className="text-danger">*</sup>
              </label>
              <div className="input">
                <input type="text" id="question" placeholder="Enter question" />
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="">Upload Image (Optional)</label>
            </div>
            <div className="upload-section pointer">
              <div>
                <center>
                  <img src={upload} draggable="false" alt="" />{" "}
                </center>
                <label htmlFor="uploadImage">
                  Drop your image here or, Browse
                </label>
                <input type="file" id="uploadImage" />
              </div>
            </div>

            <div className="d-flex gap-5 align-items-center">
              <div className="input-section w-50">
                <label htmlFor="option1">Option 1</label>
                <div className="input">
                  <input type="text" id="option1" placeholder="" />
                </div>
              </div>

              <div className="input-section w-50">
                <label htmlFor="option2">Option 2</label>
                <div className="input">
                  <input type="text" id="option2" placeholder="" />
                </div>
              </div>
            </div>

            <div className="d-flex gap-5 align-items-center">
              <div className="input-section w-50">
                <label htmlFor="option3">Option 3</label>
                <div className="input">
                  <input type="text" id="option3" placeholder="" />
                </div>
              </div>

              <div className="input-section w-50">
                <label htmlFor="option4">Option 4</label>
                <div className="input">
                  <input type="text" id="option4" placeholder="" />
                </div>
              </div>
            </div>

            <div className="input-section">
              <label htmlFor="description">Solution</label>
              <div className="input">
                <textarea
                  name=""
                  maxLength={150}
                  id="description"
                  cols="30"
                  rows="3"
                  placeholder="Enter solution"
                  className="bg-primary-10"
                ></textarea>
              </div>
            </div>

            <div className="buttons">
              <button onClick={() => navigate(-1)}>Cancel</button>
              <button onClick={() => setShowSaved(true)}>Add question</button>
            </div>
          </div> 
      </LayoutWithSidebar>
    </div>
  );
}
