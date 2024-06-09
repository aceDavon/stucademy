import { BiSortAlt2 } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { PiPlayFill } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import AddLesson from "./AddLesson";
import { useState } from "react";
import EditLesson from "./EditLesson";
import DeletePrompt from "./DeletePrompt";
import { useContext } from "react";
import { ServiceManager } from "../../../context/ServiceContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../services/AxiosInstance";

export default function Lessons() {
  const { getCourseLessons, courseLessons } = useContext(ServiceManager);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [showEditLesson, setShowEditLesson] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [deleteLesson, setDeleteLesson] = useState({
    deletePrompt: false,
    lessonToDelete: "",
  });

  const [selectedLesson, setSelectedLesson] = useState("");

  const { course } = useParams();

  async function handleDeleteLesson() {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/admin/lesson/${selectedLesson.id}`).then(()=>{
        getCourseLessons(course?.split("__")[1]);
      });
    } catch (error) {}

    setIsLoading(false);
    setDeleteLesson({ ...deleteLesson, deletePrompt: false });
  }

  useEffect(() => {
    getCourseLessons(course?.split("__")[1]);
  }, [course]);

  return (
    <div className="lessons-container">
      <header>
        <h5>Lessons</h5>
        <button onClick={() => setShowAddLesson(true)}>Add Lesson</button>
      </header>

      <section className="table-section">
        <div className="filter-area">
          <div className="rank-name">
            <div>
              S/N <BiSortAlt2 />
            </div>
          </div>

          <div className="points">
            LESSONS <BiSortAlt2 />
          </div>
        </div>

        <div className="record-section">
          {courseLessons?.length
            ? courseLessons.map((lesson, i) => {
                return (
                  <div className="item" key={i}>
                    <section>
                      <div className="rank">{i + 1}</div>

                      <div className="avatar">
                        <PiPlayFill />
                      </div>

                      <div className="name">{lesson.title}</div>
                    </section>

                    <div className="score">
                      <div
                        className="edit "
                        onClick={() => {
                          setSelectedLesson(lesson);
                          setShowEditLesson(true);
                        }}
                      >
                        {" "}
                        <FiEdit />{" "}
                      </div>
                      <div
                        className="delete "
                        onClick={() => {
                          setSelectedLesson(lesson);
                          setDeleteLesson({
                            ...deleteLesson,
                            deletePrompt: true,
                            lessonToDelete: `lesson; ${lesson.title}`,
                          });
                        }}
                      >
                        {" "}
                        <IoMdClose />{" "}
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
          {/* <div className="item">
            <section>
              <div className="rank">1</div>

              <div className="avatar">
                <PiPlayFill />
              </div>

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
              <div className="delete "
              onClick={()=>{
                setDeleteLesson({...deleteLesson, deletePrompt:true, lessonToDelete:"Chemistry"})
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

              <div className="avatar">
                <PiPlayFill />
              </div>

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

              <div className="avatar">
                <PiPlayFill />
              </div>

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
          </div> */}
        </div>
      </section>

      <div className="modals">
        <AddLesson
          showState={showAddLesson}
          setShowState={() => setShowAddLesson(false)}
        />
        <EditLesson
          showState={showEditLesson}
          setShowState={() => setShowEditLesson(false)}
          lessonToEdit={selectedLesson}
        />

        <DeletePrompt
          showState={deleteLesson.deletePrompt}
          setShowState={() =>
            setDeleteLesson({ ...deleteLesson, deletePrompt: false })
          }
          itemToDelete={deleteLesson.lessonToDelete}
          handleDelete={handleDeleteLesson}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
