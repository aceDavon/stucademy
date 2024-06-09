import { AiOutlineMinus } from "react-icons/ai"
import { useState } from "react"
import { Modal, Spinner } from "react-bootstrap"
import { axiosInstance } from "../../../services/AxiosInstance"
import { HandleNotif } from "../../../services/NotifHandler"

export default function DeductPoint({ showState, setShowState, studentId }) {
  const [empty, setEmpty] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [pointPayload, setPointPayload] = useState({
    points: "",
    action: "",
  })

  function handleValidation() {
    if (pointPayload.points && pointPayload.action) {
      handlePointsAddition(studentId)
    } else {
      setEmpty(true)
    }
  }

  async function handlePointsAddition(studentId) {
    setIsLoading(true)

    try {
      const { data } = await axiosInstance.post(
        `/users-points/deduct/${studentId}`,
        pointPayload
      )
      if (data) {
        setShowState()
      }
    } catch (error) {
      HandleNotif({
        text: `Error deucting points: ${error.message}`,
        type: 'error',
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="add-subject-container ">
      <Modal
        show={showState}
        onHide={() => {
          setShowState()
          setPointPayload({ ...pointPayload, points: "", action: "" })
        }}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="add-subject-header" closeButton>
          <div className="icon">
            <AiOutlineMinus />
          </div>{" "}
          Add Point
        </Modal.Header>
        <Modal.Body className="modalContent p-4 add-subject-content">
          <div className="input-section">
            <label htmlFor="title">
              Deduct Point<sup className="text-danger">*</sup>
            </label>
            <div className="input">
              <input
                type="text"
                id="title"
                placeholder="Enter points to be deducted"
                value={pointPayload.points}
                onChange={(e) => {
                  setPointPayload({ ...pointPayload, points: e.target.value })
                  // setEmpty(false);
                }}
              />
              {empty && !pointPayload.points ? (
                <div className="text-danger">Points is required</div>
              ) : null}
            </div>
          </div>
          <div className="input-section">
            <label htmlFor="description">Reason for point deduction</label>
            <div className="input">
              <textarea
                name=""
                maxLength={150}
                id="description"
                cols="30"
                rows="3"
                placeholder="Answer reported as spam"
                value={pointPayload.action}
                onChange={(e) => {
                  setPointPayload({ ...pointPayload, action: e.target.value })
                }}
              ></textarea>

              {empty && !pointPayload.action ? (
                <div className="text-danger">Message is required</div>
              ) : null}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="buttons">
            <button
              onClick={() => {
                setShowState()
              }}
            >
              Cancel
            </button>
            <button disabled={isLoading} onClick={() => handleValidation()}>
              {isLoading ? <Spinner size="sm" variant="light" /> : "Add"}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
