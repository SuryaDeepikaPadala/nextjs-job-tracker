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