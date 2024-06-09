import { AgChartsReact } from "ag-charts-react"
import { useEffect, useState } from "react"

export default function DoughnutStudentQueries({ data: pieData }) {
  const roundedData = Math.ceil(Number(pieData.percentage_resolved))
  const [options, setOption] = useState({
    data: [
      { queries: "Resolved", share: pieData && pieData.percentage_resolved },
      { queries: "Active", share: pieData && pieData.percentage_active },
    ],

    series: [
      {
        type: "pie",
        sectorLabelKey: "",
        calloutLabelKey: "queries",
        angleKey: "share",
        innerRadiusOffset: 10,
        sectorLabel: false,
        showInLegend: true,
        fills: ["#eecea7", "#FB8E0B"],
        innerRadiusRatio: 0.5,

        innerLabels: [
          {
            text: pieData ? `${roundedData}%` : "",
            color: "black",
            fontSize: 16,
          },
          {
            text: "",
            fontSize: 16,
            color: "white",
          },
        ],

        legend: {
          enabled: false,
          showInLegend: false,
        },
        calloutLabel: {
          enabled: false,
        },
        strokes: ["#ffffff", "#ffffff"],
        innerCircle: {
          fill: "#c9fdc902",
        },
        highlightStyle: {
          fill: "#FF0000",
          enabled: false,
        },
      },
    ],
  })

  useEffect(() => {
    if (pieData) {
      setOption((prev) => ({
        ...prev,
        data: [
          { queries: "Resolved", share: pieData.percentage_resolved },
          { queries: "Active", share: pieData.percentage_active },
        ],
        series: [
          {
            ...prev.series[0],
            innerLabels: [
              {
                ...prev.series[0].innerLabels[0],
                text: `${roundedData}%`,
              },
              { text: "", fontSize: 0 },
            ],
          },
        ],
      }))
    }
  }, [pieData])

  return (
    <div className="student-queries-container">
      <header>
        <h5>Student Queries</h5>
      </header>

      <AgChartsReact options={options} />
    </div>
  )
}
