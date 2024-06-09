import ProgressBar from "react-bootstrap/ProgressBar";
import icon from "../../../assets/icons/practice-icon.svg";
import { FiEdit3 } from "react-icons/fi";
import { SlTrash } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { IoIosMore } from "react-icons/io";
import { useState } from "react";
import DeletePrompt from "./DeletePrompt";

export default function PracticeCourseCard({
  index,
  title,
  questions,
  updatedAt,
  isActive,
  id,
  handleToggle,
  optionsToShow,
  actionFrom,
}) {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState("");
  const [deletePrompt, setDeleePrompt] = useState(false);

  function toggleShowOptions() {
    setShowOptions(showOptions ? "" : optionsToShow);
  }

  function handleDelete() {
    console.log("deleted");
  }

  return (
    <>
      <div
        className={actionFrom==="uploaded"?"course-card practice-card pointer":"course-card practice-card"}
        onClick={() => {
          setShowOptions("");
         if(actionFrom === "uploaded"){
          navigate("questions/new")
         }
        }}
      >
        <div className="head  d-flex justify-content-between">
          <div className="icon">
            <img src={icon} draggable="false" alt="" />
          </div>
          <IoIosMore
            className="fs-4"
            onClick={(e) => {
              e.stopPropagation();
              toggleShowOptions();
            }}
          />
        </div>
        <h5 className="fw-bold">{title}</h5>

        {actionFrom === "uploaded" ? (
          <div className="practice-card-footer ">
            <div className="questions">
              <b>{questions}</b>
              <div className="underlay-text">Questions</div>
            </div>
            <div className="date">
              <b>{updatedAt}</b>
              <div className="underlay-text">Last modified</div>
            </div>
          </div>
        ) : (
          <div className="progress-bar-section">
            <ProgressBar now={80} />

            <div className="d-flex gap-2 mt-2 justify-content-between">
              <div className="date">
                <span className="underlay-text">Last modified:</span>
                <span className="fs-">{updatedAt}</span>
              </div>

              <div className="questions">
                <span>Questions: </span>
                <span>{questions}/10</span>
              </div>
            </div>
          </div>
        )}

        {showOptions && showOptions === optionsToShow ? (
          <div
            className="options-menu-global"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className="item"
              onClick={() => {
               if(actionFrom==="uploaded"){
                navigate(`${id}/questions/edit`);
               }else{
                navigate("questions/draft/edit");
               }
              }}
            >
              {" "}
              <FiEdit3 /> Edit
            </div>
            <div
              className="item"
              onClick={() => {
                setDeleePrompt(true);
              }}
            >
              {" "}
              <SlTrash />
              Delete
            </div>

           {
            actionFrom === "uploaded"?(
                <div className="status-section d-flex gap-2">
                <span>
                  <div className="toggle-container">
                    <input
                      type="checkbox"
                      id={index}
                      className="toggle-input"
                      defaultChecked={isActive}
                      onChange={() => {
                        handleToggle();
                      }}
                    />
                    <label htmlFor={index} className="toggle-label">
                      <div className="toggle-slider"></div>
                    </label>
                  </div>
                </span>
                <span>{isActive ? "Active" : "Inactive"} </span>
              </div>
            ):null
           }
          </div>
        ) : null}
      </div>

      <div className="modals-section" style={{ position: "absolute" }}>
        <DeletePrompt
          showState={deletePrompt}
          setShowState={() => setDeleePrompt(false)}
          handleDelete={() => handleDelete()}
          itemToDelete={"lesson and all questions under it"}
        />
      </div>
    </>
  );
}
