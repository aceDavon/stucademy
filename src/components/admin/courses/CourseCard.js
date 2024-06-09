import f1 from "../../../assets/icons/cards/courses/f1.svg";
import f2 from "../../../assets/icons/cards/courses/f2.svg";
import f3 from "../../../assets/icons/cards/courses/f3.svg";
import eye from "../../../assets/icons/cards/courses/eye.svg";
import { useNavigate } from "react-router-dom";

export default function CourseCard({
  thumbnail,
  title,
  description,
  courses,
  lessons,
  questions,
  isActive,
  handleToggle,
  index,
  actionFrom,
  subjectId,
}) {
  const navigate = useNavigate();
  return (
    <div
      className="course-card"
      onClick={() => {
        navigate(`:${title.toLowerCase()}__${subjectId}`);
        if (actionFrom.toLowerCase() === "coursemanager") {
          
        }
      }}
    >
      <div className="course-image">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="preview-container">
        <div className="d-flex">
          <span>Preview </span> &nbsp;{" "}
          <img src={eye} alt={`preview ${title}`} />
        </div>
      </div>

      <div className="description">
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
      <div className="card-footer">
        {actionFrom === "practiceManager" ? (
          title
        ) : (
          <div className="icons-section">
            <div className="item">
              <div className="icon">
                <img src={f1} alt="" />
              </div>
              <span>{courses}</span>
            </div>

            <div className="item">
              <div className="icon">
                <img src={f2} alt="" />
              </div>
              <span>{lessons}</span>
            </div>

            <div className="item">
              <div className="icon">
                <img src={f3} alt="" />
              </div>
              <span>{questions}</span>
            </div>
          </div>
        )}

        <div
          className="status-section d-flex gap-2"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span>{isActive ? "Active" : "Inactive"} </span>
          <span>
            <div className="toggle-container">
              <input
                type="checkbox"
                id={index}
                className="toggle-input"
                defaultChecked={isActive}
                onChange={(e) => {
                  // e.stopPropagation()
                  handleToggle();
                }}
              />
              <label htmlFor={index} className="toggle-label">
                <div className="toggle-slider"></div>
              </label>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
