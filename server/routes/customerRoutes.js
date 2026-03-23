// server/routes/customerRoutes.js
import express from "express";
import pool, { createTable } from "../db.js";
import fs from "fs";
import csv from "csv-parser";

const router = express.Router();

// CSV cache
let pincodeCache = [];
const folderPath = "./pincodes";

export const loadAllFiles = async () => {
  try {
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".csv"));
    for (const file of files) {
      await new Promise((resolve, reject) => {
        fs.createReadStream(`${folderPath}/${file}`)
          .pipe(csv())
          .on("data", row => {
            pincodeCache.push({
              pincode: String(row.pincode || ""),
              locality: String(row.locality || ""),
              city: String(row.city || ""),
              state: String(row.statename || "")
            });
          })
          .on("end", () => {
            console.log(`✅ Loaded: ${file}`);
            resolve();
          })
          .on("error", reject);
      });
    }
    console.log("🎉 All CSV files loaded");
    console.log("Total records:", pincodeCache.length);
    console.log("Sample:", pincodeCache[0]);
  } catch (err) {
    console.error("❌ Error loading CSVs:", err);
  }
};

// Pincode search
router.get("/pincode", (req, res) => {
  const { search } = req.query;
  if (!search) return res.json([]);
  const searchLower = search.toLowerCase();
  const results = pincodeCache.filter(p =>
    p.pincode.startsWith(search) ||
    (p.locality && p.locality.toLowerCase().includes(searchLower))
  ).slice(0, 20);
  res.json(results);
});

// Customer CRUD
router.post("/customers", async (req, res) => {
  try {
    const {
      customer_name, phone1, phone2, 
      pincode, state, city, locality, address,
      product, product_type,
      warranty_status, svc_type,
      complaint_issue
    } = req.body;

    console.log("Incoming:", req.body); // DEBUG

    const result = await pool.query(
      `INSERT INTO customers(
        customer_name, phone1, phone2, 
        pincode, state, city, locality, address,
        product, product_type,
        warranty_status, svc_type,
        complaint_issue
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *`,
      [
        customer_name, phone1, phone2, 
        pincode, state, city, locality, address,
        product, product_type,
        warranty_status, svc_type,
        complaint_issue
      ]
    );


    res.json(result.rows[0]);
  } catch (err) {
    console.error("Insert Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/customers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ==========================
// DELETE ALL CUSTOMERS
// ==========================
router.delete("/customers/delete-all", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM customers");

    res.json({
      message: "All customer data deleted successfully",
      deletedRows: result.rowCount
    });

  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});


// ==========================
// EXPORT EXCEL
// ==========================
router.get("/customers/export", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers ORDER BY id DESC");

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Customers");

    sheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Customer Name", key: "customer_name", width: 25 },
      { header: "Phone 1", key: "phone1", width: 20 },
      { header: "Phone 2", key: "phone2", width: 20 },
      { header: "Pincode", key: "pincode", width: 15 },
      { header: "State", key: "state", width: 20 },
      { header: "City", key: "city", width: 20 },
      { header: "Locality", key: "locality", width: 20 },
      { header: "Address", key: "address", width: 30 },
      { header: "Product", key: "product", width: 20 },
      { header: "Product Type", key: "product_type", width: 25 },
      { header: "Warranty", key: "warranty_status", width: 20 },
      { header: "Service Type", key: "svc_type", width: 20 },
      { header: "Complaint", key: "complaint_issue", width: 30 }
    ];

    sheet.addRows(result.rows);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=customers.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    console.error("Excel Export Error:", err);
    res.status(500).json({ error: "Export failed" });
  }
});

export default router;