import mongoose,{Schema,Document} from "mongoose"
interface IColumn extends Document{
  name:String,
  boardId:mongoose.Types.ObjectId,
  order:Number,
  jobApplications:mongoose.Types.ObjectId[],
  createdAt:Date,
  updatedAt:Date
}
const ColumnSchema=new Schema<IColumn>({
  name:{
    type:String,
    required:true
  },
  boardId:{
    type:Schema.Types.ObjectId,
    ref:"Board",
    required:true,
    index:true
  },
  order:{
    type:Number,
   
    default:0

  },
  jobApplications:[
    {
      type:Schema.Types.ObjectId,
      ref:"JobApplication"
    }
  ]
},{
  timestamps:true
})
const Column=mongoose.models.Column || mongoose.model("Column",ColumnSchema)
export default Column