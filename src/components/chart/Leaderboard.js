import { BiCaretDown, BiCaretUp, BiSortAlt2 } from "react-icons/bi"
import avatar from "../../assets/images/avatar.jpg"
import { axiosInstance } from "../../services/AxiosInstance"
import { useEffect, useState } from "react"

export default function LeaderBoard({ boardData }) {
  const [data, setData] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        "/admin/dashboard/leadershipboard"
      )
      const { data } = response
      setData(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="leaderboard-container">
      <header>
        <h5>LeaderBoard</h5>
      </header>

      <div className="filter-area">
        {["RANK", "NAME", "POINTS"].map((col, index) => (
          <div
            key={index}
            className={col === "POINTS" ? "points" : "rank-name"}
          >
            {col} <BiSortAlt2 />
          </div>
        ))}
      </div>

      <div className="record-section">
        {data &&
          data.map((user) => (
            <div key={user.user_id} className="item">
              <section>
                <div className="rank">{user.position}</div>
                <div
                  className={
                    user.lb_level < 0 ? "status down" : "status up"
                  }
                >
                  {" "}
                  {user.lb_level < 0 ? (
                    <BiCaretDown />
                  ) : (
                    <BiCaretUp />
                  )}{" "}
                </div>

                <div className="avatar">
                  <img src={avatar} alt="" />
                </div>

                <div className="name">{user.name}</div>
              </section>

              <div className="score">{user.total_points}</div>
            </div>
          ))}
      </div>
    </div>
  )
}
