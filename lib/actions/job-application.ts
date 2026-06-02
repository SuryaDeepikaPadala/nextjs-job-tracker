"use server"

import { revalidatePath } from "next/cache"
import { sessionData } from "../auth"
import connectDB from "../db"
import Board from "../models/board"
import Column from "../models/column"
import JobApplication from "../models/jobApplication"


export const createJobApplication=async({jobData,columnId,boardId}:{jobData:any,columnId:string,boardId:string})=>{
  await connectDB()
  const {company,position,location,salary,description,notes,tags,jobUrl}=jobData
  const session=await sessionData()
  if(!session ||!session.user)
  {
    return {success:false,error:"Unauthorized"}
  }
  if(!company ||!position ||!columnId || !boardId)
  {
    return {
      success:false,
      error:"Missing Details"
    }
  }
  const board=await Board.findOne({
    userId:session.user.id,
    _id:boardId
  })
  if(!board)
  {
    return {error:"Board not found"}
  }
  const column=await Column.findOne({
    _id:columnId,
    boardId
  })
  if(!column)
  {
    return {success:false,error:"Column not found"}
  }
  const maxOrder=(await JobApplication.findOne({columnId}).sort({order:-1}).select("order").lean()) as {order:number} | null
  const jobApplication=await JobApplication.create({
    company,
    position,
    location,
    salary,
    description,
    notes,
    columnId,
    boardId,
    jobUrl,
    userId:session.user.id,
    tags:tags ? tags.split(",").map((t:string)=>t.trim()):[],
    status:column.name.toLowerCase(),
    order:maxOrder?maxOrder.order +1:0

  })
  await Column.findByIdAndUpdate(columnId,{
    $push:{
      jobApplications:jobApplication._id
    }
  })
  revalidatePath("/dashboard")
  return {success:true,data:JSON.stringify(jobApplication)}

}


export const updateJobApplication = async ({
  jobId,
  boardId,
  columnId,
  jobData,
}: {
  jobId: string
  boardId: string
  columnId: string
  jobData: any
}) => {
  try {
    await connectDB()

    const session = await sessionData()

    if (!session || !session.user) {
      return {
        success: false,
        error: "Unauthorized",
      }
    }

    const board = await Board.findOne({
      _id: boardId,
      userId: session.user.id,
    })

    if (!board) {
      return {
        success: false,
        error: "Board not found",
      }
    }

    const column = await Column.findOne({
      _id: columnId,
      boardId,
    })

    if (!column) {
      return {
        success: false,
        error: "Column not found",
      }
    }

    const updatedJob = await JobApplication.findOneAndUpdate(
      {
        _id: jobId,
        boardId,
        columnId,
        userId: session.user.id,
      },
      {
        $set: {
          company: jobData.company,
          position: jobData.position,
          location: jobData.location,
          salary: jobData.salary,
          description: jobData.description,
          notes: jobData.notes,
          jobUrl: jobData.jobUrl,
          tags: jobData.tags
            ? jobData.tags.split(",").map((t: string) => t.trim())
            : [],
        },
      },
      {
        new: true,
      }
    )

    if (!updatedJob) {
      return {
        success: false,
        error: "Job application not found",
      }
    }

    revalidatePath("/dashboard")

    return {
      success: true,
      data: JSON.stringify(updatedJob),
    }
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    }
  }
}


export const deleteJobApplication = async ({
  jobId,
  columnId,
}: {
  jobId: string
  columnId: string
}) => {
  try {
    await connectDB()

    const session = await sessionData()

    if (!session || !session.user) {
      return {
        success: false,
        error: "Unauthorized",
      }
    }

    const deletedJob = await JobApplication.findOneAndDelete({
      _id: jobId,
      userId: session.user.id,
    })

    if (!deletedJob) {
      return {
        success: false,
        error: "Job not found",
      }
    }

    await Column.findByIdAndUpdate(columnId, {
      $pull: {
        jobApplications: jobId,
      },
    })

    revalidatePath("/dashboard")

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    }
  }
}