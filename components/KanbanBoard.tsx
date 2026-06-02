"use client"

import { useState } from "react"
import {
  Heart,
  Send,
  FileText,
  Users,
  BadgeCheck,
  XCircle,
  MoreVertical,
  Trash2,
} from "lucide-react"
import JobApplicationDialog from "./JobApplicationDialog"
import JobCard from "./JobCard"

interface Board {
  name: string
  userId: string
  columns: Column[]
}

interface Column {
  _id: string // Mongoose lean query returns _id
  name: string
  boardId: string
  jobApplications: any[]
  order: number
}

const KanbanBoard = ({ board, userId }: { board: any; userId: string }) => {
  // Track which column's menu is currently open
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const columnStyles = [
    { color: "bg-pink-500/10 text-pink-500 border-pink-500/20", icon: Heart },
    { color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: Send },
    { color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", icon: FileText },
    { color: "bg-purple-500/10 text-purple-500 border-purple-500/20", icon: Users },
    { color: "bg-green-500/10 text-green-500 border-green-500/20", icon: BadgeCheck },
    { color: "bg-red-500/10 text-red-500 border-red-500/20", icon: XCircle },
  ]

  const toggleMenu = (columnId: string) => {
    setActiveMenu(activeMenu === columnId ? null : columnId)
  }

  return (
    <div className="flex gap-6 w-full items-start">
      {board?.columns?.map((col: any, index: number) => {
        const config = columnStyles[index] || {
          color: "bg-gray-500/10 text-gray-500 border-gray-500/20",
          icon: FileText,
        }

        const Icon = config.icon

        return (
          <div
            key={col._id}
            className="flex flex-col w-80 bg-slate-50/50 border border-slate-200/60 rounded-xl p-4 shrink-0 shadow-sm"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between relative mb-4">
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg border ${config.color}`}>
                  <Icon size={16} />
                </div>
                <span className="font-semibold text-slate-700 text-sm">
                  {col.name}
                </span>
               
              </div>

              {/* Action Dropdown Menu Container */}
              <div className="relative">
                <button
                  onClick={() => toggleMenu(col._id)}
                  className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <MoreVertical size={16} />
                </button>

                {/* Dropdown UI */}
                {activeMenu === col._id && (
                  <>
                    {/* Invisible backdrop to close menu on click outside */}
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setActiveMenu(null)}
                    />
                    <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20 animate-in fade-in slide-in-from-top-1 duration-150">
                      <button
                        onClick={() => {
                          alert(`Delete functionality for ${col.name} goes here!`)
                          setActiveMenu(null)
                        }}
                        className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} />
                        Delete Column
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Kanban Column Cards Container (Future Use) */}
            <div className="flex flex-col gap-3 min-h-37.5 rounded-lg mt-1">
                {col.jobApplications && [...col.jobApplications].sort((a: any, b: any) => (a.order || 0) - (b.order || 0)).map((job: any) => (
            <JobCard 
             key={job._id} 
             job={job} 
             currentColumnId={col._id} 
            board={board} 
            />  
            ))}
              <JobApplicationDialog columnId={col._id} boardId={board._id}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default KanbanBoard