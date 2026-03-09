import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: "postgresql://postgres:Admin123@localhost:5432/product_registration",
});

export default pool;