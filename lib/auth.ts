// auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";
import connectDB from "./db"; //
import { headers } from "next/headers";
import { initializeDefaultBoard } from "./utils/initializeDefaultBoard";


connectDB();


const client = mongoose.connection.getClient();
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks:{
    user:{
      create:{
        after:async(user)=>{
          if(user?.id)
          {
            await initializeDefaultBoard(user?.id)
          }
        }
      }
    }
  }
});

export const sessionData=async()=>{
  const result=await auth.api.getSession({
    headers:await headers()
  })
  return result
}