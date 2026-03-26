import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config({ path: "./.env" }); // ✅ FORCE LOAD

const isProduction = process.env.NODE_ENV === "production";

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL not set!");
  process.exit(1); // stop the server if DB URL missing
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

export const createTable = async () => {
  try {
    // 1️⃣ Create table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        agent_id TEXT,
        agent_name TEXT,
        customer_name TEXT,
        phone1 TEXT,
        phone2 TEXT,
        pincode TEXT,
        state TEXT,
        city TEXT,
        locality TEXT,
        address TEXT,
        product TEXT,
        product_type TEXT,
        serial_number TEXT,
        model_number TEXT,
        warranty_status TEXT,
        svc_type TEXT,
        complaint_issue TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2️⃣ Ensure missing columns are added (THIS IS THE REAL FIX)
    await pool.query(`
      ALTER TABLE customers 
      ADD COLUMN IF NOT EXISTS agent_id TEXT;
    `);

    await pool.query(`
      ALTER TABLE customers 
      ADD COLUMN IF NOT EXISTS agent_name TEXT;
    `);

    console.log("✅ Customers table ready (with migrations)");
  } catch (err) {
    console.error("❌ Table creation error:", err.message);
  }
};
   

export default pool;