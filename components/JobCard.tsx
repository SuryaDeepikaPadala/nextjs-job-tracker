"use client"

import {
  MoreVertical,
  Edit2,
  Trash2,
  ArrowRight,
  ExternalLink,
} from "lucide-react"

import { useState } from "react"
import toast from "react-hot-toast"
import { deleteJobApplication } from "@/lib/actions/job-application"

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

  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-md transition-all">

      {/* CONTENT */}
      <div className="flex items-start justify-between gap-3">

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-slate-800 truncate">
            {job.position}
          </h3>
          <p className="text-xs text-slate-500 truncate">
            {job.company}
          </p>

          {job.location && (
            <p className="text-xs text-slate-500 mt-2">
              📍 {job.location}
            </p>
          )}

          {job.salary && (
            <p className="text-xs text-green-600 font-semibold">
              💰 {job.salary}
            </p>
          )}

          {job.jobUrl && (
            <a
              href={job.jobUrl}
              target="_blank"
              className="text-xs text-blue-600 flex items-center gap-1 mt-2 hover:underline"
            >
              View Job <ExternalLink size={12} />
            </a>
          )}
        </div>

        {/* MENU BUTTON */}
        <div className="relative">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <MoreVertical size={16} />
          </button>

          {/* DROPDOWN */}
          {showMenu && (
            <>
              {/* backdrop */}
              <div
                className="fixed inset-0 z-[999]"
                onClick={() => setShowMenu(false)}
              />

              {/* menu */}
              <div className="absolute right-0 mt-2 w-52 rounded-xl border bg-white shadow-xl z-[1000]">

                <button
                  onClick={() => {
                    onEdit()
                    setShowMenu(false)
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-slate-50"
                >
                  <Edit2 size={14} /> Edit
                </button>

                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  {loading ? "Deleting..." : "Delete"}
                </button>

                <div className="border-t my-1" />

                <div className="px-3 py-1 text-[10px] text-slate-400 font-bold">
                  Move To
                </div>

                {otherColumns.map((col: any) => (
                  <button
                    key={col._id}
                    onClick={() => {
                      toast("Move coming soon 🚀")
                      setShowMenu(false)
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-slate-50"
                  >
                    <ArrowRight size={12} />
                    {col.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      {job.description && (
        <p className="text-xs text-slate-500 italic line-clamp-2">
          “{job.description}”
        </p>
      )}
      {job.notes && (
        <p className="text-xs text-slate-500  line-clamp-2">
          Notes:{job.notes}
        </p>
      )}

      {/* TAGS */}
      {job.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {job.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 bg-slate-100 rounded-md"
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