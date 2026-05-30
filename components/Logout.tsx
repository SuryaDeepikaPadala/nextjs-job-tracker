"use client"

import { useRouter } from "next/navigation"
import { signOut } from "../lib/auth-client"
import toast from "react-hot-toast"

const Logout = () => {
  const router = useRouter()

  return (
    <button
      onClick={async () => {
        const res = await signOut()
        if (res?.data) {
          router.push("/auth/sign-in")
          toast.success("Logged out successfully")
        }
      }}
      className="text-sm px-4 py-2 rounded-lg bg-linear-to-br  from-blue-600 via-blue-500 to-cyan-400 text-white hover: transition-all shadow-sm cursor-pointer"
    >
      Logout
    </button>
  )
}

export default Logout