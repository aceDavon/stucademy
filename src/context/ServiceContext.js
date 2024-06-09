import { createContext, useEffect, useState } from "react"
import { axiosInstance } from "../services/AxiosInstance"

export const ServiceManager = createContext()
export default function ServiceContext({ children }) {
  //SUBJECT/COURSES
  const [allSubjects, setAllSubjects] = useState([])
  const [subjectsCourses, setSubjectsCourses] = useState([])
  const [courseLessons, setCourseLessons] = useState([])
  const [courseIcons, setCourseIcons] = useState([])

  const [selectedItems, setSelectedItems] = useState({
    subject: "",
  })

  const userToken = localStorage.getItem("stucademy-tks") ?? null

  useEffect(() => {
    userToken && getAllSubjects()
  }, [userToken])

  async function getAllSubjects() {
    try {
      await axiosInstance.get("/subjects").then((resp) => {
        setAllSubjects(resp?.data?.subjects)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function getCourseIcons() {
    try {
      await axiosInstance.get("/dashboard/course/icons").then((resp) => {
        setCourseIcons(resp.data?.course_icons)
      })
    } catch (err) {
      console.log(err)
    }
  }

  async function getSubjectsCourses(subjectId) {
    try {
      const { data } = await axiosInstance.get(`/${subjectId}/courses`)

      setSubjectsCourses(data?.courses)
    } catch (error) {
      console.log(error)
    }
  }
  async function getCourseLessons(courseId) {
    try {
      const { data } = await axiosInstance.get(`/${courseId}/lessons`)
      setCourseLessons(data?.lesson)
    } catch (error) {
      console.log(error)
    }
  }

  const exportData = {
    getAllSubjects,
    allSubjects,
    setAllSubjects,
    subjectsCourses,
    setSubjectsCourses,
    getSubjectsCourses,
    courseLessons,
    getCourseLessons,
    selectedItems,
    setSelectedItems,
    getCourseIcons,
    courseIcons,
  }
  return (
    <ServiceManager.Provider value={exportData}>
      {children}
    </ServiceManager.Provider>
  )
}
