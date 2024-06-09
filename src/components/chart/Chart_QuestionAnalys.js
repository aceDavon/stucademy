import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { axiosInstance } from "../../services/AxiosInstance"

export default function ChartQuestionAnalysis({ QuestionData, activeFilter }) {
  const [data, setData] = useState({
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 150,
      },
      grid: {
        show: false,
      },
      colors: ["#6651D1", "#dededf"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: 12,
          endingShape: "rounded",
          borderRadius: 8,
        },
      },
      legend: {
        position: "top"
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {
        title: {
          text: "",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " questions"
          },
        },
      },
    },
  })

  const fetchData = async () => {
    await axiosInstance
      .get(`/admin/dashboard/questionandanswerchart/${activeFilter}`)
      .then((res) => {
        const { data } = res.data
        const updateSeries = data.series.map((dt) => ({
          ...dt,
          type: "column",
        }))

        setData((prev) => ({
          ...prev,
          series: updateSeries,
          options: {
            ...prev.options,
            xaxis: {
              ...prev.options.xaxis,
              categories: data.xaxis.categories,
            },
          },
        }))
      })
  }

  useEffect(() => {
    fetchData()
  }, [activeFilter])

  return (
    <div
      className="chart-question-analysis-container"
      style={{ height: "500px" }}
    >
      <ReactApexChart options={data.options} series={data.series} />
    </div>
  )
}
