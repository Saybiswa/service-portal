import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Auto create table
const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        customer_name TEXT,
        phone1 TEXT,
        phone2 TEXT,
        email TEXT,
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

    console.log("Customers table ready");
  } catch (err) {
    console.error("Table creation error:", err);
  }
};

createTable();

export default pool;