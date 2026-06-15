"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, Menu } from "lucide-react";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-blue-950 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {!menuOpen && (
              <button
                onClick={() => setMenuOpen(true)}
                className="focus:outline-none"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
            )}

            <div className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-300" />
              <h1 className="text-xl font-bold">
                Seismic event detection system 
              </h1>
            </div>
          </div>
        </div>
      </header>

      
    </>
  );
}
