import connectDB from "../db";
import Board from "../models/board";
import Column from "../models/column";

const columnList=[
  {
    name:"Wishlist",
    order:0
  },
  {
    name:"Applied",
    order:1
  },
  {
    name:"Assessments",
    order:2
  },
  {
    name:"Interviewing",
    order:3
  },
  {
    name:"Offer",
    order:4
  },
  {
    name:"Rejected",
    order:5
  }
]
export const initializeDefaultBoard=async(userId:String)=>{
  try {
    await connectDB()
    const existingBoard=await Board.findOne({userId,name:"Job Hunt"})
    if(existingBoard)
    {
      return existingBoard
    }
    const board=await Board.create({
      name:"Job Hunt",
      userId,
      columns:[]
    })
    const columns=await Promise.all(columnList.map((col)=>
      Column.create({
        name:col.name,
        order:col.order,
        boardId:board?._id,
        jobApplications:[]
      })
    ))
    board.columns=columns.map((col)=>col._id)
    await board.save()
    return board
  } catch (error) {
    throw  error
  }
}
