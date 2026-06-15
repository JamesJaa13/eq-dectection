"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type SensorData = {
  id: number;
  accel_x: number;
  accel_y: number;
  accel_z: number;
  gyro_x: number;
  gyro_y: number;
  gyro_z: number;
  accTotal: number;
  vibrationDetected: boolean;
  timestamp: string;
};

type Props = {
  data: SensorData[];
};

export default function LineChartComponent({ data }: Props) {
  const labels = data.map((d) => new Date(d.timestamp).toLocaleString());

  const chartData = {
    labels,
    datasets: [
      {
        label: "ระดับความรุนแรงของการสั่นสะเทือน",
        data: data.map((d) => d.accTotal),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      // เพิ่ม dataset อื่นๆ ได้ เช่น accel_x, gyro_x
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "ข้อมูลจากเซนเซอร์ตามช่วงเวลา",
      },
    },
  };

  return <Line options={options} data={chartData} />;
}
