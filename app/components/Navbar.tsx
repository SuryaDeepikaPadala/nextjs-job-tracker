import { BriefcaseBusiness } from "lucide-react"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 backdrop-blur-xl bg-white/70 border-b border-white/40 sticky top-0 z-50">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        <BriefcaseBusiness className="text-blue-600" />
        <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Job Tracker
        </span>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <Link href="/auth/sign-in">
          <button className="text-sm font-medium text-gray-600 hover:text-black transition">
            Sign In
          </button>
        </Link>

        <Link href="/auth/sign-up">
          <button className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:scale-105 transition shadow-md">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar