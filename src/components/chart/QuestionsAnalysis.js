import { GoDotFill } from "react-icons/go"
import "../../styles/chart/questionAnalysis.scss"
import ChartQuestionAnalysis from "./Chart_QuestionAnalys"
import LeaderBoard from "./Leaderboard"
import TopCourses from "./TopCourses"
import Head from "../../layout/head/Head"
import DoughnutStudentQueries from "./Doughnut_StudentQueries"
import { useState } from "react"

const filterKeys = [
  { id: Math.random(2330, 5678), title: "12 months", Value: "12_months" },
  { id: Math.random(2330, 5678), title: "3 months", Value: "3_months" },
  { id: Math.random(2330, 5678), title: "30 days", Value: "30_days" },
  { id: Math.random(2330, 5678), title: "7 days", Value: "7_days" },
]

export default function QuestionAnalysis({ dashData }) {
  const [activeFilter, setActiveFilter] = useState("12_months")
  const {
    top_courses,
    leaderboard,
    student_queries,
    answered_unanswered_filtered,
  } = dashData
  return (
    <>
      <Head title="Dashboard" />

      <div className="question-analysis-container">
        <section className="block-section">
          <div className="chart-section">
            {/* <header>
              <h5>Analysis</h5>
              <div className="chart-keys">
                <div className="answered">
                  <GoDotFill className="dot" />
                  Total Questions Answered
                </div>

                <div className="unanswered">
                  <GoDotFill className="dot" />
                  Total Questions Unanswered
                </div>
              </div>
            </header> */}
            <ul className="answer-filters">
              {filterKeys.map((key) => (
                <li
                  onClick={() => setActiveFilter(key.Value)}
                  key={key.id}
                  className={
                    key.Value === activeFilter
                      ? "answer-filter-item answer-filter-item-selected"
                      : "answer-filter-item"
                  }
                >
                  {key.title}
                </li>
              ))}
            </ul>

            <ChartQuestionAnalysis
              QuestionData={answered_unanswered_filtered}
              activeFilter={activeFilter}
            />
          </div>
          <TopCourses courses={top_courses} />
        </section>

        <div className="right-bar-section">
          <DoughnutStudentQueries data={student_queries} />
          <LeaderBoard boardData={leaderboard} />
        </div>
      </div>
    </>
  )
}
