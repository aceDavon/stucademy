import { BiSortAlt2 } from "react-icons/bi";

export default function TopCourses({ courses }) {
  
  return (
    <div className="top-courses-container">
      <header>
        <h5>Top Courses</h5>
      </header>

     <header>
     <div className="filter-area">
        <div className="points rank-name">
          COURSE TITLE
          <BiSortAlt2 className="icon" />
        </div>

        <div className="points ">
          ENROLLED STUDENTS
          <BiSortAlt2 className="icon" />
        </div>
      </div>
     </header>

   
   <div className="content-width">
   {courses
        ? courses.map((course) => {
            return (
              <div className="record" key={course.id}>
                <div className="title">{course.title}</div>

                <div className="score">{course.enrolled_students_count}</div>
              </div>
            );
          })
        : null}
   </div>


    </div>
  );
}
