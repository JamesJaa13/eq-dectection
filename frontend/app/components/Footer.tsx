"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12 text-gray-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-6 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold text-black">ระบบแจ้งเตือนแผ่นดินไหว</p>
          <p></p>
        </div>
        <div className="text-right sm:text-left">
          <p>© {new Date().getFullYear()} Seismic Event Detection System</p>
          <p></p>
        </div>
      </div>
    </footer>
  );
}
