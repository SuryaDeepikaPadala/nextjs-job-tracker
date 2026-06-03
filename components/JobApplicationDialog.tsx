"use client"
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react"

import { Plus, X, Loader2 } from "lucide-react"

import {
  createJobApplication,
  updateJobApplication,
} from "@/lib/actions/job-application"

import toast from "react-hot-toast"

interface DialogProps {
  columnId: string
  boardId: string
  job?: any
  open?: boolean
  onClose?: () => void
}

const JobApplicationDialog = ({
  columnId,
  boardId,
  job,
  open,
  onClose,
}: DialogProps) => {
  const isEditMode = !!job

  const initialState = {
    company: job?.company || "",
    position: job?.position || "",
    location: job?.location || "",
    salary: job?.salary || "",
    jobUrl: job?.jobUrl || "",
    tags: job?.tags?.join(", ") || "",
    description: job?.description || "",
    notes: job?.notes || "",
  }

  const [isOpen, setIsOpen] = useState(open || false)

  const [loading, setLoading] = useState(false)

  const [jobFormData, setJobFormData] =
    useState(initialState)

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  useEffect(() => {
    document.body.style.overflow = isOpen
      ? "hidden"
      : "unset"

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const closeDialog = () => {
    setIsOpen(false)

    if (onClose) {
      onClose()
    }
  }

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJobFormData({
      ...jobFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      let result

      if (isEditMode) {
        result = await updateJobApplication({
          jobId: job._id,
          columnId,
          boardId,
          jobData: jobFormData,
        })
      } else {
        result = await createJobApplication({
          jobData: jobFormData,
          columnId,
          boardId,
        })
      }

      if (result.success) {
        toast.success(
          isEditMode
            ? "Application updated"
            : "Application created"
        )

        setJobFormData(initialState)

        closeDialog()
      } else {
        toast.error(result.error || "Something went wrong")
      }
    } catch (error) {
      

      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Create Trigger */}
      {!isEditMode && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-xs font-semibold text-slate-500 transition-all hover:border-slate-400 hover:bg-slate-50 hover:text-slate-700"
        >
          <Plus size={14} />
          Add Application
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Backdrop */}
          <div
            onClick={closeDialog}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Dialog */}
          <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">

            {/* Close */}
            <button
              onClick={closeDialog}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                {isEditMode
                  ? "Edit Job Application"
                  : "Add Job Application"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {isEditMode
                  ? "Update your application details."
                  : "Track a new opportunity in your pipeline."}
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Row 1 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600">
                    Company *
                  </label>

                  <input
                    type="text"
                    name="company"
                    required
                    value={jobFormData.company}
                    onChange={handleOnChange}
                    placeholder="Google"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-slate-400 focus:bg-white"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600">
                    Position *
                  </label>

                  <input
                    type="text"
                    name="position"
                    required
                    value={jobFormData.position}
                    onChange={handleOnChange}
                    placeholder="Frontend Developer"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-slate-400 focus:bg-white"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={jobFormData.location}
                    onChange={handleOnChange}
                    placeholder="Remote / Hyderabad"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-slate-400 focus:bg-white"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600">
                    Salary
                  </label>

                  <input
                    type="text"
                    name="salary"
                    value={jobFormData.salary}
                    onChange={handleOnChange}
                    placeholder="8 LPA"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-slate-400 focus:bg-white"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600">
                    Job URL
                  </label>

                  <input
                    type="url"
                    name="jobUrl"
                    value={jobFormData.jobUrl}
                    onChange={handleOnChange}
                    placeholder="https://linkedin.com/..."
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-slate-400 focus:bg-white"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600">
                    Tags
                  </label>

                  <input
                    type="text"
                    name="tags"
                    value={jobFormData.tags}
                    onChange={handleOnChange}
                    placeholder="React, Remote, Full Time"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-slate-400 focus:bg-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">
                  Description
                </label>

                <textarea
                  rows={4}
                  name="description"
                  value={jobFormData.description}
                  onChange={handleOnChange}
                  placeholder="Job responsibilities..."
                  className="resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-slate-400 focus:bg-white"
                />
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">
                  Notes
                </label>

                <textarea
                  rows={3}
                  name="notes"
                  value={jobFormData.notes}
                  onChange={handleOnChange}
                  placeholder="Interview notes, follow-up reminders..."
                  className="resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-slate-400 focus:bg-white"
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">

                <button
                  type="button"
                  onClick={closeDialog}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading && (
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                  )}

                  {isEditMode
                    ? "Update Application"
                    : "Add Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default JobApplicationDialog