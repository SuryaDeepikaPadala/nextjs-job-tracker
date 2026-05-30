import { BriefcaseBusiness } from "lucide-react"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 backdrop-blur-xl bg-white/70 border-b border-white/40 sticky top-0 z-50">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        
        <span className="bg-linear-to-br from-blue-800 to-cyan-400 bg-clip-text text-transparent">
          Job Tracker
        </span>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <Link href="/auth/sign-in">
          <button className="text-sm font-medium text-gray-700 hover:text-black transition cursor-pointer">
            Sign In
          </button>
        </Link>

        <Link href="/auth/sign-up">
          <button className="bg-linear-to-r from-blue-600 via-blue-500 to-cyan-400  text-white px-4 py-2 rounded-xl font-medium hover:scale-105 transition-all shadow-xl cursor-pointer">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar