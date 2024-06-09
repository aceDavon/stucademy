import { BiSortAlt2 } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";
import Head from "../../../layout/head/Head";
import { useNavigate } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { SlTrash } from "react-icons/sl";
import { useEffect, useState } from "react";
import DeletePrompt from "../../../components/admin/courses/DeletePrompt";
import EmptySubjectCatalogue from "../../../components/empty_states/EmptySubjectCatalogue";
import { axiosInstance } from "../../../services/AxiosInstance";

export default function StudentAnalysis({ studentId }) {
  const [courses, setCourses] = useState([]);
  const [coursesMutable, setCoursesMutable] = useState([]);

  async function getStudentAnalysis(studentId) {
    try {
      const { data } = await axiosInstance.get(
        `/practice-sessions/${studentId}`
      );
      setCourses(data?.analysis);
      setCoursesMutable(data?.analysis);
    } catch (error) {
      console.log(error);
    }
  }
  // function handleFilter(arr, tag, query) {
  //   if (!query || query === "all") {
  //     return arr;
  //   } else {
  //     const result = arr.filter((element) => {
  //       return element[tag] && element[tag].includes(query);
  //     });
  //     return result;
  //   }
  // }

  function handleFilter(arr, query) {
    if (!query || query === "all") {
      return arr;
    } else {
      const result = arr.filter((element) => {
        return Object.values(element).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(query.toLowerCase())
        );
      });
      return result;
    }
  }

  useEffect(() => {
    getStudentAnalysis(studentId);
  }, [studentId]);

  return (
    <>
      <div className="course-manager-container">
        <div className="header">
          <div className="search-section w-75">
            <input
              type="search"
              placeholder="Search by subject, course title or lesson title"
              onChange={(e) =>
                setCourses(handleFilter(coursesMutable, e.target.value))
              }
            />
          </div>

          <div className="filter-button">
            <div className="select d-flex">
              Filter:
              <select name="" id="">
                <option value="active">Chemistry</option>
              </select>
            </div>
          </div>
        </div>

        {courses.length ? (
          <div className="history-table">
            <table>
              <thead>
                <td>
                  S/N <BiSortAlt2 className="icon" />
                </td>{" "}
                <td>
                  SUBJECT <BiSortAlt2 className="icon" />
                </td>
                <td>
                  COURSE TITLE <BiSortAlt2 className="icon" />
                </td>
                <td>
                  LESSON TITLE <BiSortAlt2 className="icon" />
                </td>
                <td>
                  ATTEMPTS <BiSortAlt2 className="icon" />
                </td>
                <td>
                  {" "}
                  LAST SCORE <BiSortAlt2 className="icon" />
                </td>
              </thead>

              <tbody>
                {courses.length
                  ? courses.map((course, i) => {
                      return (
                        <tr key={course.id}>
                          <td> {i + 1} </td>
                          <td> {course.subject_title} </td>
                          <td> {course.course_title} </td>
                          <td>{course.lesson_title}</td>
                          <td className="text-center"> {course.attempts} </td>
                          <td className="text-center"> {course.last_score}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        ) : (
          // <EmptySubjectCatalogue />
          "No records found"
        )}
      </div>
    </>
  );
}
