"use client"

import Link from "next/link"
import { useSession } from "../lib/auth-client"
import Logout from "./Logout"

const Navbar = () => {
  const { data } = useSession()
  console.log(data)
  return (
    <nav className="flex items-center justify-between px-8 py-4 backdrop-blur-xl bg-white/70 border-b border-white/40 sticky top-0 z-50">

      {/* Logo */}
      <Link href="/" className="font-bold text-xl">
        <span className="bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
          Job Tracker
        </span>
      </Link>

      {/* Right Side */}
      {data?.user ? (
        <div className="flex items-center gap-4">

          {/* Dashboard */}
          <Link href="/dashboard">
            <button className="text-sm font-medium text-gray-700 hover:text-black transition cursor-pointer">
              Dashboard
            </button>
          </Link>

          {/* Avatar */}
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-linear-to-br   from-blue-600 to-cyan-400 text-white font-semibold">
            {data.user.name?.[0]?.toUpperCase()}
          </div>

          {/* Logout */}
          <Logout />

        </div>
      ) : (
        <div className="flex items-center gap-4">

          <Link href="/auth/sign-in">
            <button className="text-sm font-medium text-gray-700 hover:text-black transition">
              Sign In
            </button>
          </Link>

          <Link href="/auth/sign-up">
            <button className="bg-linear-to-r from-blue-600 via-blue-500 to-cyan-400 text-white px-5 py-2 rounded-xl font-medium hover:scale-105 transition-all shadow-md">
              Sign Up
            </button>
          </Link>

        </div>
      )}
    </nav>
  )
}

export default Navbar