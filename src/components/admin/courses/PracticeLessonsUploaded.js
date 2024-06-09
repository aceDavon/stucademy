import EmptySubjectCatalogue from "../../empty_states/EmptySubjectCatalogue"
import PracticeCourseCard from "./PracticeCourseCard"

export default function PracticeLessonsUploaded({
  setSubjectsCourses,
  courseList,
  courses,
}) {
  function handleToggleStatus(subject, index) {
    setSubjectsCourses((prevCourseList) => {
      return prevCourseList.map((course, i) => {
        if (i === index) {
          return { ...course, isActive: !course.isActive }
        }
        return course
      })
    })
  }

  return courseList.length ? (
    <div className="course-catalogue-container">
      {courses.map((subject, i) => {
        return (
          <PracticeCourseCard
            onClick={() => alert("fffff")}
            key={i}
            title={subject.title}
            updatedAt={subject.updatedAt}
            questions={subject.courses}
            index={i}
            id={subject.id}
            isActive={subject.isActive}
            handleToggle={() => handleToggleStatus(subject, i)}
            actionFrom={"uploaded"}
            optionsToShow={subject.title + i}
          />
        )
      })}
    </div>
  ) : (
    <EmptySubjectCatalogue />
  )
}
