import CourseCard from "./CourseCard";
import image from "../../../assets/images/courses/chemistry.jpg";
import image2 from "../../../assets/images/courses/biology.webp";
import image3 from "../../../assets/images/courses/physics.avif";
import EmptySubjectCatalogue from "../../empty_states/EmptySubjectCatalogue";
import { useEffect, useState } from "react";

export default function PracticeCatalogue({ allSubjects }) {
  const [courseList, setCourseList] = useState([
    {
      thumbnail: image,
      title: "Practice Chemistry",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore fugiat neque doloribus maxime adipisci sed, eaque a distinctio ",
      courses: "14",
      students: "10",
      videos: "10",
      isActive: true,
    },
    {
      thumbnail: image,
      title: "Practice Chemistry",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore fugiat neque doloribus maxime adipisci sed, eaque a distinctio ",
      courses: "14",
      students: "10",
      videos: "10",
      isActive: true,
    },
    {
      thumbnail: image3,
      title: "Physics",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore fugiat neque doloribus maxime adipisci sed, eaque a distinctio ",
      courses: "12",
      students: "8",
      videos: "8",
      isActive: false,
    },
    {
      thumbnail: image2,
      title: "Biology",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore fugiat neque doloribus maxime adipisci sed, eaque a distinctio ",
      courses: "10",
      students: "12",
      videos: "9",
      isActive: true,
    },
    {
      thumbnail: image,
      title: "Mathematics",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore fugiat neque doloribus maxime adipisci sed, eaque a distinctio ",
      courses: "18",
      students: "15",
      videos: "13",
      isActive: false,
    },
    {
      thumbnail: image,
      title: "English",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore fugiat neque doloribus maxime adipisci sed, eaque a distinctio ",
      courses: "16",
      students: "11",
      videos: "12",
      isActive: true,
    },
  ]);

  function handleToggleStatus(subject, index) {
    setCourseList((prevCourseList) => {
      return prevCourseList.map((course, i) => {
        if (i === index) {
          return { ...course, isActive: !course.isActive };
        }
        return course;
      });
    });
  }
  
  useEffect(() => {
    setCourseList(allSubjects);
  }, [allSubjects]);

  return courseList.length ? (
    <div className="course-catalogue-container">
      {courseList.map((subject, i) => {
        return (
          <CourseCard
            key={i}
            thumbnail={subject.cover_photo}
            title={subject.title}
            description={subject.description}
            subjectId={subject.id}
            index={i}
            isActive={subject.status==="1"}
            handleToggle={() => handleToggleStatus(subject, i)}
            actionFrom={"practiceManager"}
          />
        );
      })}
    </div>
  ) : (
    <EmptySubjectCatalogue />
  );
}
