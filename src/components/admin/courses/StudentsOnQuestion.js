import { BiSortAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeletePrompt from "../../../components/admin/courses/DeletePrompt";
import EmptySubjectCatalogue from "../../../components/empty_states/EmptySubjectCatalogue";
import image1 from "../../../assets/images/user.jpg";
import image2 from "../../../assets/images/dorcas.jpg";

export default function StudentsOnQuestion({ questionId }) {
  const navigate = useNavigate();
  const [editCourse, setEditCourse] = useState({
    toggle: false,
    toEdit: "",
  });

  const [deleteCourse, setDeleteCourse] = useState({
    deletePrompt: false,
    lessonToDelete: "",
  });

  function handleToggleEdit(courseId) {
    setEditCourse({
      ...editCourse,
      toggle: !editCourse.toggle,
      toEdit: courseId,
    });
  }

  function handleDeleteCourse() {
    console.log("course deleted");
  }

  const [courseStudents, setCourseStudents] = useState([
    {
      id: 12345678,
      name: "Ronald Richards",
      username: "ronaldrichards",
      email: "ronald.richards@GoMail.com",
      phone: "(603) 555-0123",
      points: 780,
      status: "active",
      image: image1,
      lastScore: Math.floor(Math.random() * 11), // Random score between 0 and 10
      attempts: Math.floor(Math.random() * 11), // Random attempts between 0 and 10
    },
    {
      id: 23456789,
      name: "Alice Johnson",
      username: "alicejohnson",
      email: "alice.johnson@GoMail.com",
      phone: "(404) 555-4567",
      points: 650,
      status: "active",
      image: image2,
      lastScore: Math.floor(Math.random() * 11), // Random score between 0 and 10
      attempts: Math.floor(Math.random() * 11), // Random attempts between 0 and 10
    },
    {
      id: 34567890,
      name: "Michael Smith",
      username: "michaelsmith",
      email: "michael.smith@GoMail.com",
      phone: "(555) 123-4567",
      points: 900,
      status: "inactive",
      image: image1,
      lastScore: Math.floor(Math.random() * 11), // Random score between 0 and 10
      attempts: Math.floor(Math.random() * 11), // Random attempts between 0 and 10
    },
    {
      id: 45678901,
      name: "Emily Davis",
      username: "emilydavis",
      email: "emily.davis@GoMail.com",
      phone: "(202) 555-7890",
      points: 550,
      status: "active",
      image: image2,
      lastScore: Math.floor(Math.random() * 11), // Random score between 0 and 10
      attempts: Math.floor(Math.random() * 11), // Random attempts between 0 and 10
    },
    {
      id: 56789012,
      name: "John Johnson",
      username: "johnjohnson",
      email: "john.johnson@GoMail.com",
      phone: "(404) 555-9876",
      points: 720,
      status: "inactive",
      image: image1,
      lastScore: Math.floor(Math.random() * 11), // Random score between 0 and 10
      attempts: Math.floor(Math.random() * 11), // Random attempts between 0 and 10
    },
    {
      id: 67890123,
      name: "Emma Wilson",
      username: "emmawilson",
      email: "emma.wilson@GoMail.com",
      phone: "(555) 789-0123",
      points: 800,
      status: "active",
      image: image2,
      lastScore: Math.floor(Math.random() * 11), // Random score between 0 and 10
      attempts: Math.floor(Math.random() * 11), // Random attempts between 0 and 10
    },
    {
      id: 78901234,
      name: "Daniel Clark",
      username: "danielclark",
      email: "daniel.clark@GoMail.com",
      phone: "(707) 555-3456",
      points: 600,
      status: "inactive",
      image: image1,
      lastScore: Math.floor(Math.random() * 11), // Random score between 0 and 10
      attempts: Math.floor(Math.random() * 11), // Random attempts between 0 and 10
    },
    {
      id: 89012345,
      name: "Olivia Martinez",
      username: "oliviamartinez",
      email: "olivia.martinez@GoMail.com",
      phone: "(555) 123-8901",
      points: 950,
      status: "active",
      image: image2,
      lastScore: Math.floor(Math.random() * 11), // Random score between 0 and 10
      attempts: Math.floor(Math.random() * 11), // Random attempts between 0 and 10
    },
    {
      id: 90123456,
      name: "William Turner",
      username: "williamturner",
      email: "william.turner@GoMail.com",
      phone: "(808) 555-2345",
      points: 670,
      status: "active",
      image: image1,
      lastScore: Math.floor(Math.random() * 11), // Random score between 0 and 10
      attempts: Math.floor(Math.random() * 11), // Random attempts between 0 and 10
    },
    {
      id: 12349012,
      name: "Sophia White",
      username: "sophiawhite",
      email: "sophia.white@GoMail.com",
      phone: "(555) 234-5678",
      points: 720,
      status: "inactive",
      image: image2,
      lastScore: Math.floor(Math.random() * 11), // Random score between 0 and 10
      attempts: Math.floor(Math.random() * 11), // Random attempts between 0 and 10
    },
  ]);

  return (
    <>
      <div
        className="course-manager-container ps-4"
        onClick={() => setEditCourse({ ...editCourse, toEdit: "" })}
      >
        {courseStudents.length ? (
          <div className="history-table">
            <table>
              <thead>
                <td>
                  S/N <BiSortAlt2 className="icon" />
                </td>
                <td>
                  STUDENT'S NAME <BiSortAlt2 className="icon" />
                </td>
                <td className="text-center ">
                  LAST SCORE <BiSortAlt2 className="icon" />
                </td>
                <td className="text-center">
                  ATTEMPTS <BiSortAlt2 className="icon" />
                </td>
              </thead>

              <tbody>
                {courseStudents.length
                  ? courseStudents.map((student, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {" "}
                            <b>{i + 1}</b>{" "}
                          </td>
                          <td>
                            <div className="profile">
                              <div className="avatar">
                                <img src={student.image} alt={student.name} />
                              </div>
                              <div className="texts">
                                <div className="name">{student.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="text-center "> {student.lastScore}</td>
                          <td className="text-center"> {student.attempts} </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptySubjectCatalogue />
        )}
      </div>

      <div className="modal">
        <DeletePrompt
          showState={deleteCourse.deletePrompt}
          setShowState={() => {
            setDeleteCourse({
              ...deleteCourse.deletePrompt,
              deletePrompt: false,
            });
          }}
          itemToDelete={"Course"}
          handleDelete={() => {
            handleDeleteCourse();
          }}
        />
      </div>
    </>
  );
}
