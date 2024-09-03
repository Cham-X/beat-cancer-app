import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const drizzleDatabasePassword = import.meta.env.VITE_DRIZZLE_DATABASE_PASSWORD

const sql = neon(
    `postgresql://Data_Cancer_owner:JTBr4tA2SXdP@ep-fragrant-flower-a5ccwn24.us-east-2.aws.neon.tech/Data_Cancer?sslmode=require`
);

export const db = drizzle(sql, { schema });