import LayoutWithSidebar from "../../../layout/template/LayoutWithSidebar";
import avatar from "../../../assets/images/emoji.svg";
import { useEffect, useState } from "react";
import ProfileSettings from "./ProfileSettings";
import PasswordSettings from "./PasswordSettings";
import { axiosInstance } from "../../../services/AxiosInstance";

export default function SettingsNavigator() {
  const [initView] = useState({
    profile: false,
    password: false,
  });

  const [view, setView] = useState({
    ...initView,
    profile: true,
  });

  const [adminProfile, setAdminProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  async function getAdminProfile() {
    try {
      const { data } = await axiosInstance.get(`/admin/profile`);
      setAdminProfile(data?.user);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAdminProfile();
  }, []);

  return (
    <LayoutWithSidebar pageTitle={"Settings"}>
      <div className="profile-section">
        <div className="avatar-section">
          <img src={adminProfile?.avatar || avatar} alt={adminProfile.name} />
        </div>

        <div className="header mb-4">
          <nav className="lesson-navigator">
            <div
              onClick={() => setView({ ...initView, profile: true })}
              className={view.profile ? "active-navigator" : "button"}
            >
              Profile
            </div>

            <div
              onClick={() => setView({ ...initView, password: true })}
              className={view.password ? "active-navigator" : "button"}
            >
              Password
            </div>
          </nav>
        </div>

        {view.profile ? (
          <ProfileSettings
            adminData={adminProfile}
            getAdminProfile={getAdminProfile}
          />
        ) : (
          <PasswordSettings />
        )}
      </div>
    </LayoutWithSidebar>
  );
}
