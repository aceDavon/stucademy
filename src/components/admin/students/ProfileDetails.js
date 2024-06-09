import { useEffect, useState } from "react";
import { axiosInstance } from "../../../services/AxiosInstance";
import { Spinner } from "react-bootstrap";
import ShowToast from "../../../common/toast/Toast";

export default function ProfileDetails({ student, getProfile }) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProfile(student);
  }, [student]);

  async function handleUpdateStudent(studentId) {
    console.log(studentId);
    setIsLoading(true);
    try {
      const response= await axiosInstance.put(
        `/admin/student/${studentId}`,
        profile
      );
      if (response?.data) {
        getProfile(studentId);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <form action=""> 
      <div className="input-section">
        <label htmlFor="firstName">Full Name</label>
        <div className="input">
          <input
            type="text"
            id="firstName"
            defaultValue={profile?.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="Victor"
          />
        </div>
      </div>

      <div className="d-flex gap-5 align-items-center">
        <div className="input-section w-50">
          <label htmlFor="grade">Grade </label>
          <div className="input">
            <input
              type="text"
              id="grade"
              defaultValue={profile?.grade}
              onChange={(e) =>
                setProfile({ ...profile, grade: e.target.value })
              }
              placeholder="SS2"
            />
          </div>
        </div>

        <div className="input-section w-50">
          <label htmlFor="username">Username</label>
          <div className="input">
            <input
              type="text"
              id="username"
              defaultValue={profile?.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
              placeholder="Onoja_voo"
            />
          </div>
        </div>
      </div>

      <div className="d-flex gap-5 align-items-center">
        <div className="input-section w-50">
          <label htmlFor="email">Email Address</label>
          <div className="input">
            <input
              type="email"
              id="email"
              defaultValue={profile?.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              placeholder="onojavoo@gmail.com"
            />
          </div>
        </div>

        <div className="input-section w-50">
          <label htmlFor="phone">Phone Number</label>
          <div className="input">
            <input
              type="text"
              id="phone"
              defaultValue={profile?.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              placeholder="07045966607"
            />
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between">
        <div className="status-section ">
          <div className="">Deactivate Account</div>
          <div className="toggle-container ">
            <input
              type="checkbox"
              id={"course-status"}
              className="toggle-input"
              defaultChecked={profile?.status}
              onChange={(e) =>
                setProfile({ ...profile, status: e.target.value })
              }
            />
            <label htmlFor={"course-status"} className="toggle-label">
              <div className="toggle-slider"></div>
            </label>
          </div>
        </div>

        {student?.grade !== profile?.grade?.trim() ||
        student?.name !== profile?.name?.trim() ||
        student?.phone !== profile?.phone?.trim() ||
        student?.email !== profile?.email?.trim() ||
        student?.username !== profile?.username?.trim() ? (
          <div className="buttons">
            <button type="button" onClick={() => setProfile(student)}>
              Cancel
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleUpdateStudent(profile.id)}
            >
              {isLoading ? <Spinner size="sm" variant="light" /> : "Save"}
            </button>
          </div>
        ) : null}
      </div>
    </form>
  );
}
