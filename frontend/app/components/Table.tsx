import React, { useState } from "react";

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

const ROWS_PER_PAGE = 10;
const PAGE_GROUP_SIZE = 10;

export default function TableComponent({ data }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);

  const indexOfLastRow = currentPage * ROWS_PER_PAGE;
  const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const currentPageGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const groupStart = currentPageGroup * PAGE_GROUP_SIZE + 1;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);

  const handlePageClick = (page: number) => setCurrentPage(page);
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handlePrevGroup = () => {
    const prevGroupStart = Math.max(groupStart - PAGE_GROUP_SIZE, 1);
    setCurrentPage(prevGroupStart);
  };

  const handleNextGroup = () => {
    const nextGroupStart = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);
    setCurrentPage(nextGroupStart);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = groupStart; i <= groupEnd; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-1 px-3 py-1 rounded border transition-colors ${
            i === currentPage
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center space-x-2 flex-wrap">
        {groupStart > 1 && (
          <button
            onClick={handlePrevGroup}
            className="px-3 py-1 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            &laquo;
          </button>
        )}

        {pages}

        {groupEnd < totalPages && (
          <button
            onClick={handleNextGroup}
            className="px-3 py-1 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            &raquo;
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Table */}
      <table className="w-full mb-4 border-collapse border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">วันที่และเวลา</th>
            <th className="border p-2">การสั่นแนวแกน X</th>
            <th className="border p-2">การสั่นแนวแกน Y</th>
            <th className="border p-2">การสั่นแนวแกน Z</th>
            <th className="border p-2">การหมุนแนวแกน X</th>
            <th className="border p-2">การหมุนแนวแกน Y</th>
            <th className="border p-2">การหมุนแนวแกน Z</th>
            <th className="border p-2">ระดับความสั่นสะเทือนรวม</th>
            <th className="border p-2">สถานะการสั่นสะเทือน</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((d) => (
            <tr key={d.id} className="even:bg-gray-50">
              <td className="border p-2">{new Date(d.timestamp).toLocaleString()}</td>
              <td className="border p-2">{d.accel_x.toFixed(2)}</td>
              <td className="border p-2">{d.accel_y.toFixed(2)}</td>
              <td className="border p-2">{d.accel_z.toFixed(2)}</td>
              <td className="border p-2">{d.gyro_x.toFixed(2)}</td>
              <td className="border p-2">{d.gyro_y.toFixed(2)}</td>
              <td className="border p-2">{d.gyro_z.toFixed(2)}</td>
              <td className="border p-2">{d.accTotal.toFixed(2)}</td>
              <td className="border p-2">{d.vibrationDetected ? "ตรวจพบ" : "ไม่พบ"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded border ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"
          }`}
        >
          ก่อนหน้า
        </button>

        {renderPagination()}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded border ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"
          }`}
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}
