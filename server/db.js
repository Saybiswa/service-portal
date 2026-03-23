import pkg from "pg";
const { Pool } = pkg;

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
    await pool.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        customer_name TEXT,
        phone1 TEXT,
        phone2 TEXT,
        email TEXT,
        pincode TEXT,
        state TEXT,
        city TEXT,
        locality TEXT,
        address TEXT,
        product TEXT,
        product_type TEXT,
        model_number TEXT,
        serial_number TEXT,
        warranty_status TEXT,
        svc_type TEXT,
        complaint_issue TEXT
      );
    `);
    console.log("✅ Customers table ready");
  } catch (err) {
    console.error("❌ Table creation error:", err.message);
  }
};

export default pool;