import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
  const { title, data, colors, labels } = props;

  return (
    <Bar
      data={{
        datasets: [
          {
            data,
            label: title,
            backgroundColor: colors || [
              "rgb(220, 0, 15)",
              "rgb(237, 217, 24)",
              "rgb(25, 171, 254)",
              "rgb(255, 120, 80)",
              "rgb(200, 100, 100)",
              "rgb(100, 255, 100)",
            ],
          },
        ],
      }}
      options={{
        animation: {
          duration: 2000,
        },
        scales: {
          xAxes: [
            {
              type: "category",
              ticks: {
                fontSize: 10,
              },
              labels: labels,
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }}
    />
  );
};

export default BarChart;
