import "./styles/global.scss"
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Index from "./pages/Index"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/Dashboard"
import CourseManager from "./pages/managers/CourseManager"
import Subject from "./pages/managers/Subject"
import AddCourse from "./components/admin/courses/AddCourse"
import EditCourse from "./components/admin/courses/EditCourse"
import CourseStudents from "./pages/managers/CourseStudents"
import PracticeManager from "./pages/managers/PracticeManager"
import PracticeSubject from "./pages/managers/PracticeSubject"
import PracticeLessons from "./components/admin/courses/PracticeLessons"
import PracticeAddQuestion from "./components/admin/courses/PracticeAddQuestion"
import PracticeQuestionsEdit from "./components/admin/courses/PracticeQuestionsEdit"
import EditDraftQuestion from "./components/admin/courses/EditDraftQuestion"
import AllStudents from "./pages/managers/students_manager/AllStudents"
import StudentProfile from "./components/admin/students/StudentProfile"
import AllQuestions from "./pages/managers/QandA/AllQuestions"
import QuestionDetails from "./components/admin/QandA/QuestionDetails"
import AllQueries from "./pages/managers/queries"
import Settings from "./pages/Settings"
import Notifications from "./pages/notifications"
import ServiceContext from "./context/ServiceContext"
import { ToastContainer } from "react-toastify"
import Register from "./pages/auth/Register"
import { IconManager } from "./pages/managers/icons/IconsManager"

function App() {
  const localData = localStorage.getItem("stucademy-tks")

  const userToken = localData ?? null
  return (
    <BrowserRouter>
      <ServiceContext>
        <Routes>
          <Route path="/">
            <Route
              path=""
              element={userToken ? <Dashboard /> : <Navigate to={"auth"} />}
            />
            <Route path="homepage" element={<Index />} />
            <Route path="auth" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/manager">
            <Route path="courses" element={<CourseManager />} />
            <Route path="courses/:subjectId" element={<Subject />} />
            <Route path="courses/:subject/course/new" element={<AddCourse />} />
            <Route
              path="courses/:subject/:course/edit"
              element={<EditCourse />}
            />
            <Route
              path="courses/:subject/:course/students"
              element={<CourseStudents />}
            />
            <Route path="practice" element={<PracticeManager />} />
            <Route path="practice/:subject" element={<PracticeSubject />} />
            <Route
              path="practice/:subject/lessons"
              element={<PracticeLessons />}
            />
            <Route
              path="practice/:subject/lessons/questions/new"
              element={<PracticeAddQuestion />}
            />
            <Route
              path="practice/:subject/lessons/:lessonId/questions/edit"
              element={<PracticeQuestionsEdit />}
            />
            <Route
              path="practice/:subject/lessons/questions/draft/edit"
              element={<EditDraftQuestion />}
            />
          </Route>

          {/* STUDENTS MANAGER */}

          <Route path="/manager">
            <Route path="students" element={<AllStudents />} />
            <Route
              path="students/:student/profile"
              element={<StudentProfile />}
            />
          </Route>

          {/* Q & A MANAGER */}

          <Route path="/manager">
            <Route path="questions" element={<AllQuestions />} />
            <Route
              path="questions/:questionId/details"
              element={<QuestionDetails />}
            />
          </Route>
          {/* QUERIES MANAGER */}

          <Route path="/manager">
            <Route path="queries" element={<AllQueries />} />
          </Route>

          {/* SETTINGS */}

          <Route path="/manager">
            <Route path="settings" element={<Settings />} />
            <Route path="icons" element={<IconManager />} />
          </Route>

          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<Index />} />
          </Route>

          {/* NOTIFICATIONS */}
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<>404; Page not found</>} />
        </Routes>
      </ServiceContext>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
