import { Briefcase, BarChart3, FolderKanban } from "lucide-react"

const FeatureTabs = () => {
  const tabs = [
    {
      title: "Organize Applications",
      theory:
        "Create custom boards and columns to track your job applications at every stage of the process.",
      icon: <FolderKanban className="text-blue-600" size={28} />,
    },
    {
      title: "Track Progress",
      theory:
        "Monitor your application status from applied to interview to offer with visual kanban boards.",
      icon: <BarChart3 className="text-purple-600" size={28} />,
    },
    {
      title: "Stay Organized",
      theory:
        "Never lose track of an application. Keep all your job search information in one centralized place.",
      icon: <Briefcase className="text-pink-600" size={28} />,
    },
  ]

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">

      {/* Heading */}
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-3xl md:text-4xl font-medium">
          Everything you need to{" "}
          <span className=" bg-linear-to-br from-blue-800 to-cyan-400 bg-clip-text text-transparent">
            manage your job search
          </span>
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto">
          Simple, powerful tools to help you stay organized and land offers faster.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {tabs.map((tab) => (
          <div
            key={tab.title}
            className="group bg-white/60 backdrop-blur-xl border border-white/40 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-2"
          >
            <div className="mb-4">{tab.icon}</div>

            <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-800 transition  ">
              {tab.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {tab.theory}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeatureTabs