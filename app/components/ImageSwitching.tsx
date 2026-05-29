"use client"

import Image from "next/image"
import { useState } from "react"

const ImageSwitch = () => {
  const [activeTab, setActiveTab] = useState("organize")

  const tabs = [
    { key: "organize", label: "Organize" },
    { key: "hired", label: "Get Hired" },
    { key: "boards", label: "Boards" },
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
        {activeTab === "organize" && (
          <Image
            src="https://i.pinimg.com/1200x/ed/6f/02/ed6f022dfe47b5cd753e86c5c1016f0b.jpg"
            alt="organize"
            width={800}
            height={500}
            className="w-full h-auto"
          />
        )}

        {activeTab === "hired" && (
          <Image
            src="https://i.pinimg.com/webp/1200x/e1/f7/a9/e1f7a9632742e2bdcd100e4336aef175.webp"
            alt="hired"
            width={800}
            height={500}
            className="w-full h-auto"
          />
        )}

        {activeTab === "boards" && (
          <Image
            src="https://i.pinimg.com/736x/a1/3a/9b/a13a9b6dcc3548d28c0cb427a5355ba2.jpg"
            alt="boards"
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