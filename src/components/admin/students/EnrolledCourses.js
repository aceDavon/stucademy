import { BiSortAlt2 } from "react-icons/bi";
import Head from "../../../layout/head/Head";
import left from "../../../assets/icons/page_left.svg";
import right from "../../../assets/icons/page_right.svg";

import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { axiosInstance } from "../../../services/AxiosInstance"; 

export default function EnrolledCourses({ studentId }) {



  const [enrolledCourses, setEnrolledCourse] = useState([]);

  async function getStudentEnrolledCourses(studentId) {
    try {
      const { data } = await axiosInstance.get(
        `/admin/${studentId}/enrolled-courses`
      );
      setEnrolledCourse(data?.enrolled_courses);
    } catch (error) {console.log(error)}
  }

  useEffect(() => {
    getStudentEnrolledCourses(studentId);
  }, []);
  return (
    <>
      <Head title="Subject | Course Manager" />

      <div className="course-manager-container" onClick={() => {}}>
        {enrolledCourses.length ? (
          <div className="history-table">
            <table>
              <thead>
                <tr>
                  <td>
                    S/N <BiSortAlt2 className="icon" />
                  </td>
                  <td>
                    COURSE TITLE <BiSortAlt2 className="icon" />
                  </td>
                  <td>
                    PROGRESS <BiSortAlt2 className="icon" />
                  </td>
                  <td className="text-center">
                    DATE ENROLLED <BiSortAlt2 className="icon" />
                  </td>
                </tr>
              </thead>

              <tbody>
                {enrolledCourses?.length
                  ? enrolledCourses.map((course, i) => {
                      return (
                        <tr
                          key={i}
                          onClick={() => {
                            // navigate(":student/profile")
                          }}
                        >
                          <td> {i + 1} </td>
                          <td>
                            <div className="profile">
                              <div className="avatar">
                                <img
                                  src={course.course_avatar}
                                  alt={course.course_title}
                                  style={{objectFit:"cover !important", objectPosition:"top center"}}
                                />
                              </div>
                              <div className="texts">
                                <div className="name">
                                  {course.course_title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="progress-bar-section bg-transparent">
                              <ProgressBar now={course.progress_percentage} />

                              <div className="d-flex gap-2 mt-2 justify-content-end">
                                <div className="questions">
                                  <span>Lesson completed: </span>
                                  <span>
                                    {course.total_completed_lessons}/
                                    {course.total_lessons}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-center ">
                            {new Date(
                              course?.date_enrolled
                            ).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>

            <footer className="pagination-footer">
              <div className="range">1-5 of 10 items</div>
              <div className="controllers-section">
                <div className="pages-list">
                  <img src={left} alt="move left" />
                  <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>...</li>
                    <li>19</li>
                  </ul>
                  <img src={right} alt="move right" />
                </div>

                <div className="counter-section">
                  <div className="count">10</div>
                  <div className="controller">
                    <div className="up">
                      {" "}
                      <AiFillCaretUp />{" "}
                    </div>
                    <div className="down">
                      {" "}
                      <AiFillCaretDown />{" "}
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        ) : (
          // <EmptySubjectCatalogue />
          "No records found"
        )}
      </div>
    </>
  );
}
