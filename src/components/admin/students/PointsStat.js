import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

export default function PointsStat({totalPoints, pointsGained, pointsLost}) {
  return (
    <div className="points-stats-container">
      <div className="stat">
        <p>Total Points</p>
        <div className="count-status-section">
          <header>
            <h2>{totalPoints}</h2>
          </header>

          {/* <div className="status">
            <span>
              <BsArrowUpShort />
            </span>
            <span>10%</span>
          </div> */}
        </div>
      </div>

      <div className="stat ">
        <p>Total Points Gained</p>
        <div className="count-status-section">
          <header>
            <h2>{pointsGained}</h2>
          </header>

          {/* <div className="status negative">
            <span>
              <BsArrowDownShort />
            </span>
            <span>10%</span>
          </div> */}
        </div>
      </div>
      <div className="stat ">
        <p>Total Points Lost</p>
        <div className="count-status-section">
          <header>
            <h2>{pointsLost}</h2>
          </header>

          {/* <div className="status positive">
            <BsArrowUpShort />

            <span>10%</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
