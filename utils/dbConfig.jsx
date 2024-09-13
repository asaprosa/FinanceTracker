import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema'


const sql = neon('postgresql://ExpenseTracker_owner:13VSAKOBYHaf@ep-icy-butterfly-a5qbam8c.us-east-2.aws.neon.tech/ExpenseTracker?sslmode=require');

export const db = drizzle(sql,{schema});
