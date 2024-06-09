import { BsEye, BsEyeSlash } from "react-icons/bs";
import "../../../styles/comoponents_pages/settings.scss";
import { useState } from "react";
import { axiosInstance } from "../../../services/AxiosInstance";
import { Spinner } from "react-bootstrap";
export default function PasswordSettings() {
  const [empty, setEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState({
    currentPassword: false,
    newPassword: false,
  });

  const [passwordPayload, setPasswordPayload] = useState({
    current_password: "",
    new_password: "",
  });

  function handleValidation() {
    if (passwordPayload.current_password && passwordPayload.new_password) {
      setEmpty(false);
      handlePasswordUpdate();
    } else {
      setEmpty(true);
    }
  }

  async function handlePasswordUpdate() {
    setIsLoading(true);

    try {
     await axiosInstance
        .post("/admin/password/reset", passwordPayload)
        .then((resp) => {
          console.log(resp);
        });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <div className="password-settings-container">
      <div className="input-section w-50">
        <label htmlFor="password">Current Password</label>
        <div className="input">
          <input
            type={view.currentPassword ? "text" : "password"}
            id="password"
            placeholder="**********"
            value={passwordPayload.current_password}
            onChange={(e) =>
              setPasswordPayload({
                ...passwordPayload,
                current_password: e.target.value,
              })
            }
          />

          {view.currentPassword ? (
            <BsEyeSlash
              className="eye"
              onClick={() =>
                setView({ ...view, currentPassword: !view.currentPassword })
              }
            />
          ) : (
            <BsEye
              className="eye"
              onClick={() =>
                setView({ ...view, currentPassword: !view.currentPassword })
              }
            />
          )}
        </div>

        {empty && !passwordPayload.current_password ? (
          <div className="text-danger">Enter current password</div>
        ) : null}
      </div>

      <div className="input-section w-50">
        <label htmlFor="newPassword">New Password</label>
        <div className="input">
          <input
            type={view.newPassword ? "text" : "password"}
            id="newPassword"
            placeholder="**************"
            value={passwordPayload.new_password}
            onChange={(e) =>
              setPasswordPayload({
                ...passwordPayload,
                new_password: e.target.value,
              })
            }
          />
          {view.newPassword ? (
            <BsEyeSlash
              className="eye"
              onClick={() =>
                setView({ ...view, newPassword: !view.newPassword })
              }
            />
          ) : (
            <BsEye
              className="eye"
              onClick={() =>
                setView({ ...view, newPassword: !view.newPassword })
              }
            />
          )}
        </div>
        {empty && !passwordPayload.new_password ? (
          <div className="text-danger">Enter new password</div>
        ) : null}
      </div>

      <div className="buttons">
        <button>Cancel</button>
        <button onClick={() => handleValidation()} disabled={isLoading}>
          {" "}
          {isLoading ? <Spinner size="sm" variant="light" /> : "Save"}
        </button>
      </div>
    </div>
  );
}
