"use client"

import { useState, useEffect } from "react"
import { DndContext, closestCenter, useDroppable } from "@dnd-kit/core"
import { Heart, Send, FileText, Users, BadgeCheck, XCircle } from "lucide-react"

import JobApplicationDialog from "./JobApplicationDialog"
import JobCard from "./JobCard"
import { moveJob } from "@/lib/actions/job-application"

interface Column {
  _id: string
  name: string
  boardId: string
  jobApplications: any[]
  order: number
}

const columnStyles = [
  { color: "bg-pink-500/10 text-pink-500 border-pink-500/20", icon: Heart },
  { color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: Send },
  { color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", icon: FileText },
  { color: "bg-purple-500/10 text-purple-500 border-purple-500/20", icon: Users },
  { color: "bg-green-500/10 text-green-500 border-green-500/20", icon: BadgeCheck },
  { color: "bg-red-500/10 text-red-500 border-red-500/20", icon: XCircle },
]

const KanbanBoard = ({ board, userId }: { board: any; userId: string }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [selectedColumnId, setSelectedColumnId] = useState("")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleEditJob = (job: any, columnId: string) => {
    setSelectedJob(job)
    setSelectedColumnId(columnId)
    setEditOpen(true)
  }

  const handleCloseEditDialog = () => {
    setEditOpen(false)
    setSelectedJob(null)
    setSelectedColumnId("")
  }

  const handleDragEnd = async (event: any) => {
    const { active, over } = event
    if (!over) return

    const jobId = active.id
    const newColumnId = over.id
    let oldColumnId = ""

    for (const col of board.columns) {
      if (col.jobApplications.some((j: any) => j._id === jobId)) {
        oldColumnId = col._id
        break
      }
    }

    if (!oldColumnId || oldColumnId === newColumnId) return

    await moveJob({
      jobId,
      fromColumnId: oldColumnId,
      toColumnId: newColumnId,
    })
  }

  // ⭐ Stable Server Placeholder Shell (Keeps Hook counts perfectly zero on SSR render)
  if (!isMounted) {
    return (
      <div className="flex w-full items-start gap-6 opacity-60">
        {board?.columns?.map((col: Column) => (
          <div
            key={col._id}
            className="flex w-80 shrink-0 flex-col rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 shadow-sm"
          >
            <div className="text-sm font-semibold text-slate-400">{col.name}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex w-full items-start gap-6">
          {board?.columns?.map((col: Column, index: number) => (
            // ⭐ CALL THE SUBCOMPONENT INSTEAD OF EXECUTING INLINE HOOKS
            <KanbanColumn
              key={col._id}
              col={col}
              index={index}
              board={board}
              onEditJob={handleEditJob}
            />
          ))}
        </div>
      </DndContext>

      {/* EDIT DIALOG */}
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

// ⭐ NEW ISOLATED SUB-COMPONENT
// This structure isolates the `useDroppable` lifecycle hook clean and separate!
const KanbanColumn = ({
  col,
  index,
  board,
  onEditJob,
}: {
  col: Column
  index: number
  board: any
  onEditJob: (job: any, columnId: string) => void
}) => {
  const config = columnStyles[index % columnStyles.length]
  const Icon = config.icon

  // Hooks are now safe, top-level citizens inside this child template
  const { setNodeRef } = useDroppable({
    id: col._id,
  })

  return (
    <div
      ref={setNodeRef}
      className="flex w-80 shrink-0 flex-col rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 shadow-sm"
    >
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`rounded-xl border p-1.5 ${config.color}`}>
            <Icon size={16} />
          </div>

          <div>
            <span className="text-sm font-semibold text-slate-800">{col.name}</span>
            <span className="block text-[11px] text-slate-400">
              {col.jobApplications?.length || 0} Applications
            </span>
          </div>
        </div>
      </div>

      {/* JOBS CONTAINER */}
      <div className="flex min-h-[200px] flex-col gap-3">
        {col.jobApplications &&
          [...col.jobApplications]
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
            .map((job: any) => (
              <JobCard
                key={job._id}
                job={job}
                currentColumnId={col._id}
                board={board}
                onEdit={() => onEditJob(job, col._id)}
              />
            ))}

        <JobApplicationDialog columnId={col._id} boardId={board._id} />
      </div>
    </div>
  )
}

export default KanbanBoard