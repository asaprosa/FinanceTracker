import("drizzle-kit").Config
import { defineConfig } from "drizzle-kit"



 
export default defineConfig({
     schema: "./utils/schema.jsx",
     dialect: 'postgresql',
   
    dbCredentials: {
        url: 'postgresql://ExpenseTracker_owner:13VSAKOBYHaf@ep-icy-butterfly-a5qbam8c.us-east-2.aws.neon.tech/ExpenseTracker?sslmode=require'
    }
})