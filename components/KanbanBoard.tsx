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

interface Column {
  _id: string
  name: string
  boardId: string
  jobApplications: any[]
  order: number
}

const KanbanBoard = ({
  board,
  userId,
}: {
  board: any
  userId: string
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  // EDIT STATES
  const [editOpen, setEditOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [selectedColumnId, setSelectedColumnId] =
    useState("")

  const columnStyles = [
    {
      color:
        "bg-pink-500/10 text-pink-500 border-pink-500/20",
      icon: Heart,
    },
    {
      color:
        "bg-blue-500/10 text-blue-500 border-blue-500/20",
      icon: Send,
    },
    {
      color:
        "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      icon: FileText,
    },
    {
      color:
        "bg-purple-500/10 text-purple-500 border-purple-500/20",
      icon: Users,
    },
    {
      color:
        "bg-green-500/10 text-green-500 border-green-500/20",
      icon: BadgeCheck,
    },
    {
      color:
        "bg-red-500/10 text-red-500 border-red-500/20",
      icon: XCircle,
    },
  ]

  const toggleMenu = (columnId: string) => {
    setActiveMenu(
      activeMenu === columnId ? null : columnId
    )
  }

  const handleEditJob = (
    job: any,
    columnId: string
  ) => {
    setSelectedJob(job)
    setSelectedColumnId(columnId)
    setEditOpen(true)
  }

  const handleCloseEditDialog = () => {
    setEditOpen(false)
    setSelectedJob(null)
    setSelectedColumnId("")
  }

  return (
    <>
      <div className="flex w-full items-start gap-6">
        {board?.columns?.map(
          (col: Column, index: number) => {
            const config = columnStyles[index] || {
              color:
                "bg-gray-500/10 text-gray-500 border-gray-500/20",
              icon: FileText,
            }

            const Icon = config.icon

            return (
              <div
                key={col._id}
                className="flex w-80 shrink-0 flex-col rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 shadow-sm"
              >
                {/* HEADER */}
                <div className="relative mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`rounded-xl border p-1.5 ${config.color}`}
                    >
                      <Icon size={16} />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-800">
                        {col.name}
                      </span>

                      <span className="text-[11px] text-slate-400">
                        {col.jobApplications?.length || 0}{" "}
                        Applications
                      </span>
                    </div>
                  </div>

                  {/* COLUMN MENU */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        toggleMenu(col._id)
                      }
                      className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {activeMenu === col._id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() =>
                            setActiveMenu(null)
                          }
                        />

                        <div className="absolute right-0 z-20 mt-1 w-40 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                          <button
                            onClick={() => {
                              alert(
                                `Delete column functionality for ${col.name}`
                              )

                              setActiveMenu(null)
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                            Delete Column
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* JOB CARDS */}
                <div className="flex min-h-[200px] flex-col gap-3">
                  {col.jobApplications &&
                    [...col.jobApplications]
                      .sort(
                        (a: any, b: any) =>
                          (a.order || 0) -
                          (b.order || 0)
                      )
                      .map((job: any) => (
                        <JobCard
                          key={job._id}
                          job={job}
                          currentColumnId={col._id}
                          board={board}
                          onEdit={() =>
                            handleEditJob(
                              job,
                              col._id
                            )
                          }
                        />
                      ))}

                  {/* CREATE DIALOG */}
                  <JobApplicationDialog
                    columnId={col._id}
                    boardId={board._id}
                  />
                </div>
              </div>
            )
          }
        )}
      </div>

      {/* GLOBAL EDIT DIALOG */}
      {editOpen && selectedJob && (
        <JobApplicationDialog
          open={editOpen}
          onClose={handleCloseEditDialog}
          job={selectedJob}
          columnId={selectedColumnId}
          boardId={board._id}
        />
      )}
    </>
  )
}

export default KanbanBoard