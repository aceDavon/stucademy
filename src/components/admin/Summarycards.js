import Card from "./Card"
import { useEffect, useState } from "react"
import { CardData } from "./students/StudentsConstants"


export default function SummaryCards({ dashData }) {
  const { unanswered_questions, answered_unanswered_filtered } = dashData
  const [questionsStats, setQuestionsStats] = useState({})

  const questionStatus = () => {
    const questions = Object.values(answered_unanswered_filtered)
    const total_answered = questions.reduce(
      (acc, val) => acc + val.total_answered,
      0
    )
    const total_unanswered = questions.reduce(
      (acc, val) => acc + val.total_unanswered,
      0
    )
    setQuestionsStats({ total_answered, total_unanswered })
  }

  useEffect(() => {
    answered_unanswered_filtered && questionStatus()
  }, [answered_unanswered_filtered])

  return (
    <div className="summary-cards-container">
      {CardData.map((card, index) => (
        <Card
          key={index}
          icon={card.icon}
          title={card.title}
          count={dashData[card.dataKey]}
          percentage={card.percentage}
        />
      ))}
    </div>
  )
}
