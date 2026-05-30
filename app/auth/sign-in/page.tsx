"use client"

import { signIn } from "@/lib/auth-client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast"

const SignIn = () => {
  const initialState = {
    
    email: "",
    password: "",
  }

  const [loginFormData, setLoginFormData] = useState(initialState)
  const router=useRouter()
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await signIn.email({
       
          email: loginFormData.email,
          password: loginFormData.password,
        
      })
      if(result?.error)
      {
        toast.error(result?.error?.message ||"something went wrong")
      }
      else
      {
          toast.success("Redirecting...")
          router.push("/dashboard")
      }
    } catch (error) {
      toast.error("something went wrong")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-blue-50 to-cyan-100 px-4">

      {/* Card */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-8 space-y-6">

        {/* Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Welcome to JobTracker</h2>
          <p className="text-gray-600 text-sm">
            Start tracking your job applications 🚀
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

         

          <input
            type="email"
            name="email"
            value={loginFormData.email}
            placeholder="Email"
            onChange={handleOnChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
          />

          <input
            type="password"
            name="password"
            value={loginFormData.password}
            placeholder="Password"
            onChange={handleOnChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg  bg-linear-to-br from-blue-800 to-cyan-400 text-white font-medium hover:scale-105 transition-all shadow-md"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn