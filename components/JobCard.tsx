"use client"

import {
  MoreVertical,
  Edit2,
  Trash2,
  ArrowRight,
  ExternalLink,
  GripVertical, // ⭐ Added explicit grip visual icon
} from "lucide-react"
import { useDraggable } from "@dnd-kit/core"
import { useState } from "react"
import toast from "react-hot-toast"
import { deleteJobApplication, moveJob } from "@/lib/actions/job-application"

interface JobCardProps {
  job: any
  currentColumnId: string
  board: any
  onEdit: () => void
}

const JobCard = ({
  job,
  currentColumnId,
  board,
  onEdit,
}: JobCardProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: job._id,
  })
  
  const otherColumns =
    board?.columns?.filter((col: any) => col._id !== currentColumnId) || []

  const handleDelete = async () => {
    try {
      setLoading(true)
      const res = await deleteJobApplication({
        jobId: job._id,
        columnId: currentColumnId,
      })

      if (res.success) {
        toast.success("Deleted")
      } else {
        toast.error(res.error || "Failed")
      }
    } catch (err) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
      setShowMenu(false)
    }
  }

  const handleManualMove = async (toColumnId: string) => {
    try {
      setLoading(true)
      const res = await moveJob({
        jobId: job._id,
        fromColumnId: currentColumnId,
        toColumnId,
      })
      if (res.success) {
        toast.success("Job moved successfully!")
      } else {
        toast.error("Failed to move job")
      }
    } catch (err) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
      setShowMenu(false)
    }
  }

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-md transition-all"
    >
      {/* HEADER SECTION WITH DRAG GRIP */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-1.5 flex-1 min-w-0">
          {/* ⭐ THE DRAG HANDLE 
              Only clicking/dragging this specific element moves the card.
              The rest of the card handles clicks normally without interference!
          */}
          <div
            {...listeners}
            {...attributes}
            className="mt-0.5 p-0.5 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing rounded hover:bg-slate-100 shrink-0"
            title="Drag to reposition"
          >
            <GripVertical size={16} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-800 truncate">
              {job.position}
            </h3>
            <p className="text-xs text-slate-500 truncate">
              {job.company}
            </p>
          </div>
        </div>

        {/* OPTIONS MENU BUTTON */}
        <div className="relative shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu((prev) => !prev)
            }}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <MoreVertical size={16} />
          </button>

          {/* DROPDOWN OPTIONS OVERLAY */}
          {showMenu && (
            <>
              {/* Invisible backdrop shield */}
              <div
                className="fixed inset-0 z-[999]"
                onClick={() => setShowMenu(false)}
              />

              {/* ⭐ FIXED POPUP CONTAINER: Uses solid white background and higher z-index layers */}
              <div className="absolute right-0 mt-1 w-52 rounded-xl border border-slate-200 bg-white shadow-xl z-[1000] py-1.5 flex flex-col">
                <button
                  onClick={() => {
                    onEdit()
                    setShowMenu(false)
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <Edit2 size={14} /> Edit Details
                </button>

                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  {loading ? "Deleting..." : "Delete Application"}
                </button>

                <div className="border-t border-slate-100 my-1.5" />

                <div className="px-3 py-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Move Pipeline Stage
                </div>

                {otherColumns.map((col: any) => (
                  <button
                    key={col._id}
                    disabled={loading}
                    onClick={() => handleManualMove(col._id)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-50 text-left"
                  >
                    <ArrowRight size={12} className="text-slate-400" />
                    {col.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* METADATA DETAILS */}
      <div className="flex flex-col gap-1 pl-5">
        {job.location && (
          <p className="text-xs text-slate-500 flex items-center gap-1">
            📍 <span className="truncate">{job.location}</span>
          </p>
        )}

        {job.salary && (
          <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
            💰 <span>{job.salary}</span>
          </p>
        )}

        {job.jobUrl && (
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 inline-flex items-center gap-1 mt-1 hover:underline w-fit"
          >
            View Listing <ExternalLink size={12} />
          </a>
        )}
      </div>

      {/* NOTES AND DESCRIPTION SECTIONS */}
      {(job.description || job.notes) && (
        <div className="border-t border-slate-100/70 pt-2 flex flex-col gap-1.5 pl-5">
          {job.description && (
            <p className="text-xs text-slate-400 italic line-clamp-2">
              “{job.description}”
            </p>
          )}
          {job.notes && (
            <p className="text-xs text-slate-500 line-clamp-2">
              <span className="font-medium text-slate-600">Notes:</span> {job.notes}
            </p>
          )}
        </div>
      )}

      {/* TAG LABELS */}
      {job.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1 pl-5">
          {job.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default JobCard