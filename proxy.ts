
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";


export async function proxy (req:NextRequest){
  const session = await auth.api.getSession({
    headers:req.headers
  })
  const {pathname}=req.nextUrl
  if(pathname.startsWith("/dashboard"))
  {
     if(!session )
    {
      return NextResponse.redirect(new URL("/auth/sign-in",req.url))
    }
  }
  if(pathname.startsWith("/auth"))
  {
    if(session)
    {
      return NextResponse.redirect(new URL("/dashboard",req.url))
    }
  }
  return NextResponse.next()
  
}