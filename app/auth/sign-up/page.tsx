"use client"

import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"

const SignUp = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  }

  const [registerFormData, setRegisterFormData] = useState(initialState)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(registerFormData)
    setRegisterFormData(initialState)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-blue-50 to-cyan-100 px-4">

      {/* Card */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-8 space-y-6">

        {/* Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Create your account</h2>
          <p className="text-gray-600 text-sm">
            Start tracking your job applications 🚀
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            value={registerFormData.name}
            placeholder="Username"
            onChange={handleOnChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
          />

          <input
            type="email"
            name="email"
            value={registerFormData.email}
            placeholder="Email"
            onChange={handleOnChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
          />

          <input
            type="password"
            name="password"
            value={registerFormData.password}
            placeholder="Password"
            onChange={handleOnChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg  bg-linear-to-br from-blue-800 to-cyan-400 text-white font-medium hover:scale-105 transition-all shadow-md"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp