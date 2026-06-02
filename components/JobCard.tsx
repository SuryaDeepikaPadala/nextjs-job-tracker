"use client"

import {
  MoreVertical,
  Edit2,
  Trash2,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import { useState } from "react"

interface JobCardProps {
  job: any
  currentColumnId: string
  board: any
}

const JobCard = ({ job, currentColumnId, board }: JobCardProps) => {
  const [showMenu, setShowMenu] = useState(false)

  const otherColumns =
    board?.columns?.filter(
      (col: any) => col._id !== currentColumnId
    ) || []

  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">

      {/* Top Section */}
      <div className="flex items-start justify-between gap-3">

        {/* Left Content */}
        <div className="min-w-0 flex-1">

          <div className="flex flex-col">
            <h3 className="truncate text-sm font-bold tracking-tight text-slate-800">
              {job.position}
            </h3>

            <p className="truncate text-xs font-medium text-slate-500">
              {job.company}
            </p>
          </div>

          {/* Metadata */}
          <div className="mt-3 flex flex-col gap-1.5 text-xs">

            {job.location && (
              <div className="flex items-center gap-1 text-slate-500">
                <span>📍</span>
                <span>{job.location}</span>
              </div>
            )}

            {job.salary && (
              <div className="flex items-center gap-1 font-semibold text-emerald-600">
                <span>💰</span>
                <span>{job.salary}</span>
              </div>
            )}

            {/* Job URL */}
            {job.jobUrl && (
              <a
                href={
                  job.jobUrl.startsWith("http")
                    ? job.jobUrl
                    : `https://${job.jobUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-1 text-blue-600 transition-colors hover:text-blue-800 hover:underline"
              >
                View Job
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Menu */}
        <div className="relative shrink-0">

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <MoreVertical size={16} />
          </button>

          {showMenu && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowMenu(false)}
              />

              {/* Dropdown */}
              <div className="absolute right-0 z-30 mt-2 w-52 rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl">

                {/* Edit */}
                <button
                  onClick={() => {
                    alert(`Edit clicked for ${job.position}`)
                    setShowMenu(false)
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <Edit2 size={14} className="text-slate-400" />
                  Edit Application
                </button>

                {/* Delete */}
                <button
                  onClick={() => {
                    alert(`Delete clicked for ${job.position}`)
                    setShowMenu(false)
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <Trash2 size={14} />
                  Delete Application
                </button>

                {/* Divider */}
                <div className="my-1 border-t border-slate-100" />

                {/* Move Header */}
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Move To Stage
                </div>

                {/* Move Actions */}
                {otherColumns.map((col: any) => (
                  <button
                    key={col._id}
                    onClick={() => {
                      alert(`Move to ${col.name}`)
                      setShowMenu(false)
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                  >
                    <ArrowRight
                      size={12}
                      className="text-slate-400"
                    />

                    {col.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      {job.description && (
        <p className="line-clamp-2 text-xs italic leading-relaxed text-slate-500">
          “{job.description}”
        </p>
      )}

      {/* Notes */}
      {job.notes && (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <p className="mb-1 text-[11px] font-semibold text-slate-700">
            Notes
          </p>

          <p className="text-[11px] leading-relaxed text-slate-500">
            {job.notes}
          </p>
        </div>
      )}

      {/* Tags */}
      {job.tags && job.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {job.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
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