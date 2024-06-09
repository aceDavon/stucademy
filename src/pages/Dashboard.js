import { Suspense, useEffect, useState } from "react"
import SummaryCards from "../components/admin/Summarycards"
import QuestionAnalysis from "../components/chart/QuestionsAnalysis"
import LayoutWithSidebar from "../layout/template/LayoutWithSidebar"
import { axiosInstance } from "../services/AxiosInstance"

export default function Dashboard() {
  const [dashData, setDashData] = useState(null)

  const fetchDashData = async () => {
    try {
      const response = await axiosInstance.get(`/admin/dashboard`)
      setDashData(response.data)
    } catch (error) {
      console.error(`Error fetching: ${error}`)
    }
  }

  useEffect(() => {
    fetchDashData()
  }, [])

  return (
    <LayoutWithSidebar>
      {dashData ? (
        <>
          <SummaryCards dashData={dashData} />
          <QuestionAnalysis dashData={dashData} />
        </>
      ) : (
        <Suspense fallback={<>Loading...</>}>
          <div class="card" aria-hidden="true">
            <div class="card-body">
              <h5 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
              </h5>
              <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a
                href="#"
                tabindex="-1"
                class="btn btn-primary disabled placeholder col-6"
              ></a>
            </div>
          </div>
        </Suspense>
      )}
    </LayoutWithSidebar>
  )
}
