import { Modal, Spinner } from "react-bootstrap";
import avatar from "../../../assets/images/dorcas.jpg";
import { CiWarning } from "react-icons/ci";
import { axiosInstance } from "../../../services/AxiosInstance";
import { useState } from "react";
import ShowToast from "../../../common/toast/Toast";

export default function QueryDetails({
  showState,
  setShowState,
  queryData,
  reloadQueriesFunc,
}) {
  const [adminResponse, setAdminResponse] = useState("");
  const [sendFedbacktoUser, setSendFeedbackToUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function getReportDetails() {
    try {
      await axiosInstance.get(`/reports/${queryData?.id}`).then((resp) => {
        const data = resp.data;
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleQueryResolution() {
    setIsLoading(true);
    try {
      await axiosInstance
        .patch(`/reports/${queryData?.id}`, {
          admin_response: adminResponse,
          send_feedback: setSendFeedbackToUser,
        })
        .then(() => {
          ShowToast({ type: "success", text: "Query resolved" });
          reloadQueriesFunc();
          setShowState();
        });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <div className="add-subject-container  ">
      <Modal
        show={showState}
        onHide={() => setShowState()}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add-subject-header" closeButton>
          <div className="icon me-2">
            <CiWarning />
          </div>{" "}
          Query Details
        </Modal.Header>
        <Modal.Body className="modalContent p-4 add-subject-content question-with-answers-container">
          <div className="summary-section">
            <div className="profile">
              <div className="avatar">
                <img
                  src={queryData?.user?.avatar || avatar}
                  alt="question.askedBy"
                />
              </div>
              <div className="names">
                <div className="username">{queryData?.user?.username}</div>
                <div className="subtitle">
                  Student ID: {queryData?.user?.id}
                </div>
              </div>
            </div>

            <div className="date-time-section subtitle">
              <div className="key">
                <p className="text-danger text-decoration-underline pointer">
                  View question
                </p>
              </div>
            </div>
          </div>

          <div className="input-section">
            <label htmlFor="title">Report Type</label>
            <div className="input">
              <input
                type="text"
                id="title"
                defaultValue={queryData?.report_type}
                disabled
              />
            </div>
          </div>

          <div className="d-flex  gap-3">
            <div className="input-section w-50">
              <label htmlFor="subject">Subject</label>
              <div className="input">
                <input
                  type="text"
                  id="subject"
                  defaultValue={queryData?.subject}
                  disabled
                />
              </div>
            </div>

            <div className="input-section w-50 gap-3">
              <label htmlFor="category">Category</label>
              <div className="input">
                <input
                  type="text"
                  id="category"
                  defaultValue={queryData?.report_category}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="d-flex  gap-3">
            <div className="input-section w-50">
              <label htmlFor="date">Date</label>
              <div className="input">
                <input
                  type="text"
                  id="date"
                  // placeholder="12/23/2023"
                  defaultValue={new Date(
                    queryData?.created_at
                  ).toLocaleDateString()}
                  disabled
                />
              </div>
            </div>

            <div className="input-section w-50 gap-3">
              <label htmlFor="time">Time</label>
              <div className="input">
                <input
                  type="text"
                  id="time"
                  // placeholder="03:45 PM"
                  defaultValue={new Date(
                    queryData?.created_at
                  ).toLocaleTimeString()}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="input-section">
            <label htmlFor="title">Details</label>
            <div className="input">
              <input
                type="text"
                id="title"
                disabled
                placeholder="The question given was incomplete bla bla bla"
                defaultValue={queryData?.report_details}
              />
            </div>
          </div>

          <div className="input-section">
            {!queryData.admin_response ? (
              <div>
                <label htmlFor="description">Send Feedback to User</label>
                <div className="input">
                  <textarea
                    name=""
                    maxLength={150}
                    id="description"
                    cols="30"
                    rows="3"
                    autoFocus
                    placeholder="Enter feedback to user"
                    onChange={(e) => setAdminResponse(e.target.value)}
                  ></textarea>
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="description">Feedback sent to User</label>
                <div className="input">
                  <textarea
                    name=""
                    maxLength={150}
                    id="description"
                    cols="30"
                    rows="3"
                    autoFocus
                    disabled
                    defaultValue={queryData.admin_response}
                    placeholder="Enter feedback to user"
                  ></textarea>
                </div>
              </div>
            )}

            {!queryData.admin_response ? (
              <label
                className="checkbox-container center"
                htmlFor="sendFeedback"
              >
                <input
                  type="checkbox"
                  checked={sendFedbacktoUser}
                  name="dashboard"
                  onChange={(e) => setSendFeedbackToUser(e.target.checked)}
                  id="sendFeedback"
                />
                <span className="checkmark"></span>
                Send feedback to user
              </label>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="buttons">
            <button
              onClick={() => {
                setShowState();
              }}
            >
              Cancel
            </button>
            {!queryData.admin_response ? (
              <button
                onClick={() => {
                  handleQueryResolution();
                }}
                disabled={isLoading}
              >
                {" "}
                {isLoading ? (
                  <Spinner size="sm" variant="light" />
                ) : (
                  "Resolve"
                )}{" "}
              </button>
            ) : null}
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
