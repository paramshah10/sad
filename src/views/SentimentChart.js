import React from "react";
import Chart from "chart.js";

export default function SentimentChart(props) {
  React.useEffect(() => {
    var config = {
      type: "pie",
      data: {
        labels: [
          "Positive",
          "Neutral",
          "Negative",
        ],
        datasets: [
          {
            label: "Overall Sentiment",
            backgroundColor: ["Green",
              'Gray',
              'Red'],//["#4c51bf"],
            borderColor: "#000000",
            data: [3,2,2],
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sentiment Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
      },
    };
    var ctx = document.getElementById("pie-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-gray-200 mb-1 text-xs font-semibold">
                {props.city}
              </h6>
              <h2 className="text-white text-xl font-semibold">Overall Sentiment (This week)</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="p-2 relative h-350-px">
            <canvas id="pie-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
