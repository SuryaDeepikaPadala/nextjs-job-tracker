import { MoveRightIcon } from "lucide-react"
import Link from "next/link"
import ImageSwitch from "./components/ImageSwitching"

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-blue-50 to-purple-100 flex flex-col items-center px-6 py-16 gap-16">

      {/* Hero */}
      <main className="max-w-3xl text-center space-y-8">
        <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Track Your Job Applications Smarter 
        </h2>
        

        <p className="text-gray-600 text-lg md:text-xl max-w-xl mx-auto">
          Stay organized, track progress, and land your dream job faster with a clean and powerful dashboard.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link href="/auth/sign-in">
            <button className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-7 py-3 rounded-xl font-medium hover:scale-105 transition-all shadow-xl">
              Get Started <MoveRightIcon size={18} />
            </button>
          </Link>

          
        </div>

        <p className="text-sm text-gray-500">
          Free forever. No credit card required.
        </p>
      </main>

      {/* Feature Section */}
      <section className="w-full max-w-5xl backdrop-blur-xl bg-white/60 p-8 rounded-3xl shadow-xl border border-white/40">
        <ImageSwitch />
      </section>

    </div>
  )
}

export default Home