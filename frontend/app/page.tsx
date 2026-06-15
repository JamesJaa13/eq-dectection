"use client";

import React, { useState } from "react";
import DatePicker from "./components/DatePicker";
import TableComponent from "./components/Table";
import LineChartComponent from "./components/LineChart";

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

export default function Page() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!startDate || !endDate) {
      alert("กรุณาเลือกช่วงวันที่ให้ครบ");
      return;
    }

    setLoading(true);
    setError(null);

    const API_BASE_URL = "http://192.168.4.10:3001"; // หรือ localhost:3001 ก็ได้
    const url = `${API_BASE_URL}/sensor?start=${startDate}&end=${endDate}`;
    console.log("Fetching:", url);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error("Response not OK:", res.status, await res.text());
        throw new Error(`HTTP ${res.status}`);
      }
      const json = await res.json();
      console.log("Fetched data:", json);
      setData(json);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl mb-4 font-bold">เลือกช่วงวันที่</h1>

      <div className="flex space-x-4 mb-4">
        <DatePicker label="วันที่เริ่มต้น" value={startDate} onChange={setStartDate} />
        <DatePicker label="วันที่สิ้นสุด" value={endDate} onChange={setEndDate} />
      </div>

      <button
        onClick={handleSearch}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ค้นหา
      </button>

      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {/* เมื่อไม่พบข้อมูล */}
      {!loading && !error && data.length === 0 && (
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p>กรุณาเลือกวันให้ถูกต้องและครบถ้วน</p>
        </div>
      )}

      {/* เมื่อมีข้อมูล */}
      {!loading && !error && data.length > 0 && (
        <>
          {/* กรอบสำหรับ Table */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-semibold mb-4">บันทึกข้อมูลจากเซนเซอร์</h2>
            <TableComponent data={data} />
          </div>

          {/* กรอบสำหรับ Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <LineChartComponent data={data} />
          </div>
        </>
      )}
    </div>
  );
}
