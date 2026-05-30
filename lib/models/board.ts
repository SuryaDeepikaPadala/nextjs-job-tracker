import mongoose,{Schema, Document} from "mongoose"
interface IBoard extends Document{
  name:String,
  userId:String,
  columns:mongoose.Types.ObjectId[],
  createdAt:Date,
  updatedAt:Date
}
const BoardSchema=new Schema<IBoard>({
  name:{
    type:String,
    required:true
  },
  userId:{
    type:String,
    required:true,
    index:true
  },
  columns:[{
    type:Schema.Types.ObjectId,
    ref:"Column"
  }]
},
{timestamps:true})
const Board=mongoose.models?.Board || mongoose.model("Board",BoardSchema)
export default Board
