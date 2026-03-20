import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Auto create table + add missing columns
const createTable = async () => {
  try {

    // 1️⃣ CREATE TABLE
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

    // 2️⃣ CHECK IF COLUMN EXISTS
    const check = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='customers' AND column_name='pincode';
    `);

    // 3️⃣ ADD COLUMN ONLY IF NOT EXISTS
    if (check.rows.length === 0) {
      await pool.query(`ALTER TABLE customers ADD COLUMN pincode TEXT;`);
      console.log("✅ Pincode column added");
    }

    console.log("✅ Customers table ready");

  } catch (err) {
    console.error("❌ Table creation error:", err.message);
  }
};

export default pool;