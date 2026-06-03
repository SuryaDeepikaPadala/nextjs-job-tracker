"use client"

import Image from "next/image"
import { useState } from "react"
import hero1 from "../public/hero1.png"
import hero2 from "../public/hero2.png"
import hero3 from "../public/hero3.png"
const ImageSwitch = () => {
  const [activeTab, setActiveTab] = useState("organize")

  const tabs = [
    { key: "boards", label: "Boards" },
    { key: "hired", label: "Get Hired" },
    { key: "organize", label: "Organize" },
  ]

  return (
    <div className="flex flex-col items-center gap-8">

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-200/60 p-2 rounded-xl backdrop-blur">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-white shadow-md text-blue-700 scale-105"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Image */}
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/40">
       

        {activeTab === "hired" && (
          <Image
            src={hero2}
            alt="hired"
            width={800}
            height={500}
            className="w-full h-auto"
          />
        )}

        {activeTab === "boards" && (
          <Image
            src={hero1}
            alt="boards"
            width={800}
            height={500}
            className="w-full h-auto"
          />
        )}
         {activeTab === "organize" && (
          <Image
            src={hero3}
            alt="organize"
            width={800}
            height={500}
            className="w-full h-auto"
          />
        )}
      </div>

    </div>
  )
}

export default ImageSwitch