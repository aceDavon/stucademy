import CourseCard from "./CourseCard";
import EmptySubjectCatalogue from "../../empty_states/EmptySubjectCatalogue";
import { useContext } from "react";
import { ServiceManager } from "../../../context/ServiceContext";

export default function CourseCatalogue() {
  const { allSubjects, setAllSubjects } =
    useContext(ServiceManager);

  async function handleToggleStatus(subjectId, index) {
    setAllSubjects((prevCourseList) => {
      return prevCourseList.map((course, i) => {
        if (i === index) {
          return { ...course, status: course.status ? 0 : 1 };
        }
        return course;
      });
    });
  }



  return allSubjects?.length ? (
    <div className="course-catalogue-container">
      {allSubjects.map((subject, i) => {
       
        return (
          <CourseCard
            key={i}
            thumbnail={subject.cover_photo}
            title={subject.title}
            description={subject.description}
            courses={subject.number_of_courses}
            lessons={subject.number_of_lessons}
            questions={subject.number_of_practice_questions}
            index={i}
            isActive={subject.status}
            handleToggle={() => handleToggleStatus(subject.id, i)}
            actionFrom={"courseManager"}
            subjectId={subject.id}
          />
        )
      })}
    </div>
  ) : (
    <EmptySubjectCatalogue />
  );
}
