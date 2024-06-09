import { useNavigate, useParams } from "react-router-dom"

export function BreadCrumb({ course = null }) {
  const { subject, subjectId, course: courseId } = useParams()
  const navigate = useNavigate()

  const courseCheck = course !== null || courseId !== null

  return (
    <header>
      <div className="breadcrumb mb-5 mt-3">
        <div
          className="location pointer"
          onClick={() => navigate(courseCheck ? -2 : -1)}
        >
          Subjects
        </div>
        <div className="sign">&gt;</div>
        <div
          className={courseCheck ? "location pointer" : "location"}
          onClick={() => courseCheck && navigate(-1)}
        >
          {" "}
          {subjectId
            ? subjectId
                ?.split("__")[0]
                ?.substring(1)
                ?.charAt(0)
                ?.toUpperCase() + subjectId?.split("__")[0]?.substring(2)
            : subject?.split("__")[0]?.substring(1)?.charAt(0)?.toUpperCase() +
              subject?.split("__")[0]?.substring(2)}
        </div>
        {courseCheck ? (
          <>
            <div className="sign">&gt;</div>
            {courseId ? (
              <div className="location">
                {courseId.split("__")[0].substring(0).charAt(0).toUpperCase() +
                  courseId.split("__")[0].substring(1)}
              </div>
            ) : (
              <div className="location">{course?.title}</div>
            )}
          </>
        ) : null}
      </div>
    </header>
  )
}
