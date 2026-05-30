import {betterAuth} from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import {MongoClient} from "MongoDB"
const client=new MongoClient(process.env.MONGO_URI)
export const auth=betterAuth({
  database:mongodbAdapter(client.db(),{
    client
  }),
  emailAndPassword:{
    enabled:true
  }
  
})
