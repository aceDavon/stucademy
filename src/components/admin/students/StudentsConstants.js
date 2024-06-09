import total_user from "../../../assets/icons/cards/total_users.svg"
import total_course from "../../../assets/icons/cards/total_courses.svg"
import total_question from "../../../assets/icons/cards/total_questions.svg"
import total_answer from "../../../assets/icons/cards/total_answers.svg"
import total_practice_question from "../../../assets/icons/cards/total_practice_questions.svg"

export const CardData = [
  {
    icon: total_user,
    title: "Total Users",
    dataKey: "total_users",
    percentage: 24.4,
  },
  {
    icon: total_course,
    title: "Total Courses",
    dataKey: "total_courses",
    percentage: null,
  },
  {
    icon: total_question,
    title: "Total Questions",
    dataKey: "total_questions",
    percentage: 24.4,
  },
  {
    icon: total_answer,
    title: "Total Answers",
    dataKey: "total_answered",
    percentage: 13,
  },
  {
    icon: total_practice_question,
    title: "Total Unanswered Questions",
    dataKey: "total_unanswered",
    percentage: "",
  },
]