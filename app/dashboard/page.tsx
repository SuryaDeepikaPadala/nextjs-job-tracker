import KanbanBoard from "@/components/KanbanBoard"
import { sessionData } from "@/lib/auth"
import connectDB from "@/lib/db"
import Board from "@/lib/models/board"
import Column from "@/lib/models/column"
import JobApplication from "@/lib/models/jobApplication"
import "@/lib/models/jobApplication"
const Dashboard = async () => {
  await connectDB()

  const session = await sessionData()
  
  // Guard clause handling secure TypeScript routing
  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-slate-500 font-medium">
        Unauthorized. Please log in.
      </div>
    )
  }

  let board = await Board.findOne({
    userId: session.user.id,
    name: "Job Hunt",
  }).populate({
    path:"columns",
    populate:{
      path:"jobApplications"
    }
  })
    .lean()

  if (!board) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-slate-500 font-medium">
        No tracking board found. Create a board to begin.
      </div>
    )
  }
  board=JSON.parse(JSON.stringify(board))

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Sub-header Controls Section */}
      <div className="border-b border-slate-200/80 bg-white px-8 py-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {board.name}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage your pipeline, track interview schedules, and monitor applications.
          </p>
        </div>
      </div>

      {/* Kanban Container Section */}
      <div className="p-8 max-w-400 mx-auto">
        <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-200">
          <KanbanBoard board={board} userId={session.user.id} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard