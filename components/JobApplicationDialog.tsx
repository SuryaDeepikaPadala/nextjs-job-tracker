"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { createJobApplication } from '@/lib/actions/job-application'
import toast from 'react-hot-toast'

interface DialogProps {
  columnId: string
  boardId: string
}

const JobApplicationDialog = ({ columnId, boardId }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const initialState={
    company:"",
    position:"",
    location:"",
    salary:"",
    jobUrl:"",
    tags:"",
    description:"",
    notes:""
  }
  const[jobFormData,setJobFormData]=useState(initialState)
  // Quick helper to prevent layout scrolling when modal is open
  if (typeof window !== 'undefined') {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }
  const handleOnChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    setJobFormData({
      ...jobFormData,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit=async(e:FormEvent)=>{
    try {
       e.preventDefault()
      const result=await createJobApplication({jobData:jobFormData,columnId,boardId})
      if(result.success)
      {
        setIsOpen(false)
        setJobFormData(initialState)
      }
      else
      {
        toast.error(result?.error || "")
      }

    
    } catch (error) {
      toast.error("something went wrong")
      console.log(error)
    }
   
  }
  return (
    <>
      {/* Trigger Button - Sits beautifully inside the dashed column container */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/80 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-all shadow-sm"
      >
        <Plus size={14} />
        Add Application
      </button>

      {/* Modal Overlay Shell */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Layer */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content Box */}
          <div className="relative bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl border border-slate-100 p-6 z-10 flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Add Job Application</h2>
              <p className="text-xs text-slate-500 font-medium">Track a new opportunity in your pipeline.</p>
            </div>

            {/* Form Fields Layout */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-xs font-semibold text-slate-600">Company *</label>
                  <input 
                    type="text" 
                    value={jobFormData.company}
                    id="company" 
                    name="company" 
                    required 
                    placeholder="e.g., Google"
                    className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder:text-slate-400 bg-slate-50/30"
                    onChange={(e)=>handleOnChange(e)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="position" className="text-xs font-semibold text-slate-600">Position *</label>
                  <input 
                    type="text" 
                    value={jobFormData.position}
                    id="position" 
                    name="position" 
                    required 
                    placeholder="e.g., Frontend Engineer"
                    className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder:text-slate-400 bg-slate-50/30"
                     onChange={(e)=>handleOnChange(e)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="location" className="text-xs font-semibold text-slate-600">Location</label>
                  <input 
                    type="text" 
                    name="location"
                    value={jobFormData.location}
                    id="location" 
                    placeholder="e.g., Hyderabad / Remote"
                    className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder:text-slate-400 bg-slate-50/30"
                     onChange={(e)=>handleOnChange(e)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="salary" className="text-xs font-semibold text-slate-600">Salary Package</label>
                  <input 
                    type="text" 
                    name="salary"
                    value={jobFormData.salary}
                    id="salary" 
                    placeholder="e.g., 6 LPA"
                    className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder:text-slate-400 bg-slate-50/30"
                     onChange={(e)=>handleOnChange(e)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="joburl" className="text-xs font-semibold text-slate-600">Job Posting URL</label>
                  <input 
                    type="url" 
                    id="joburl" 
                    name="jobUrl" 
                    value={jobFormData.jobUrl}
                    placeholder="https://linkedin.com/..."
                    className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder:text-slate-400 bg-slate-50/30"
                     onChange={(e)=>handleOnChange(e)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="tags" className="text-xs font-semibold text-slate-600">Tags</label>
                  <input 
                    type="text" 
                    id="tags" 
                    name="tags" 
                    value={jobFormData.tags}
                    placeholder="React, Remote, Full-time"
                    className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder:text-slate-400 bg-slate-50/30"
                     onChange={(e)=>handleOnChange(e)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="description" className="text-xs font-semibold text-slate-600">Job Description</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={jobFormData.description}
                  rows={3} 
                  placeholder="Paste core responsibilities or requirements..."
                  className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all resize-none placeholder:text-slate-400 bg-slate-50/30"
                   onChange={(e)=>handleOnChange(e)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="notes" className="text-xs font-semibold text-slate-600">Personal Notes</label>
                <textarea 
                  id="notes" 
                  name="notes" 
                  value={jobFormData.notes}
                  rows={2} 
                  placeholder="Interviewer names, follow-up timelines, or application thoughts..."
                  className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all resize-none placeholder:text-slate-400 bg-slate-50/30"
                   onChange={(e)=>handleOnChange(e)}
                />
              </div>

              {/* Action Control Buttons Footer */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    setJobFormData(initialState)
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Add Application
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