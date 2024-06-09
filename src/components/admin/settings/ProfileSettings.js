import { useEffect, useState } from "react";
import "../../../styles/comoponents_pages/settings.scss";
import { axiosInstance } from "../../../services/AxiosInstance";
import { Spinner } from "react-bootstrap";
export default function ProfileSettings({ adminData, getAdminProfile }) {
  const [isLoading, setIsLoading] = useState(false);

  const [adminProfile, setAdminProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [adminProfileControl, setAdminProfileControl] = useState();

  // async function getAdminProfile() {
  //   try {
  //     const { data } = await axiosInstance.get(`/admin/profile`);
  //     setAdminProfile(data?.user);
  //     setAdminProfileControl(data?.user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function handleUpdateAdmin() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(`/profile`, adminProfile);
      console.log(response)
      const { data } = response;
      if (data) {
        getAdminProfile();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    setAdminProfile(adminData);
    setAdminProfileControl(adminData);
  }, [adminData]);

  return (
    <div className="profile-settings-container">
      <div className="input-section">
        <label htmlFor="firstName">Full Name</label>
        <div className="input">
          <input
            type="text"
            id="firstName"
            placeholder="Victor"
            value={adminProfile?.name || ""}
            onChange={(e) =>
              setAdminProfile({ ...adminProfile, name: e.target.value })
            }
          />
        </div>
      </div>

      <div className="d-flex gap-5 align-items-center ">
        <div className="input-section w-50">
          <label htmlFor="email">Email Address</label>
          <div className="input">
            <input
              type="email"
              id="email"
              placeholder="onojavoo@gmail.com"
              value={adminProfile?.email || ""}
              readOnly
              // onChange={(e) =>
              //   setAdminProfile({ ...adminProfile, email: e.target.value })
              // }
            />
          </div>
        </div>

        <div className="input-section w-50">
          <label htmlFor="phone">Phone Number</label>
          <div className="input">
            <input
              type="phone"
              id="phone"
              placeholder="08154799404"
              value={adminProfile?.phone || ""}
              onChange={(e) =>
                setAdminProfile({ ...adminProfile, phone: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      {(adminProfile?.email &&
        adminProfile?.email?.trim() !== adminProfileControl?.email) ||
      (adminProfile?.phone &&
        adminProfile?.phone?.trim() !== adminProfileControl?.phone) ||
      (adminProfile?.name &&
        adminProfile?.name?.trim() !== adminProfileControl?.name) ? (
        <div className="buttons">
          <button onClick={() => setAdminProfile(adminProfileControl)}>
            Cancel
          </button>
          <button
            onClick={() => {
              console.log(adminProfile);
              handleUpdateAdmin();
            }}
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" variant="light" /> : "Save"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
