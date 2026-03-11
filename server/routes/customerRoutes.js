import express from "express";
import pool from "../db.js";

const router = express.Router();

// CREATE CUSTOMER
router.post("/customer", async (req, res) => {
  try {
    const {
      customer_name,
      phone1,
      phone2,
      email,
      state,
      city,
      locality,
      address,
      product,
      product_type,
      model_number,
      serial_number,
      warranty_status,
      svc_type,
      complaint_issue
    } = req.body;

    // Basic validation
    if (!customer_name || !phone1) {
      return res.status(400).json({
        error: "Customer name and phone1 are required"
      });
    }

    const query = `
      INSERT INTO customers (
        customer_name,
        phone1,
        phone2,
        email,
        state,
        city,
        locality,
        address,
        product,
        product_type,
        model_number,
        serial_number,
        warranty_status,
        svc_type,
        complaint_issue
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15
      )
      RETURNING *
    `;

    const values = [
      customer_name,
      phone1,
      phone2 || null,
      email || null,
      state || null,
      city || null,
      locality || null,
      address || null,
      product || null,
      product_type || null,
      model_number || null,
      serial_number || null,
      warranty_status || null,
      svc_type || null,
      complaint_issue || null
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Customer created successfully",
      data: result.rows[0]
    });

  } catch (err) {
    console.error("Insert Error:", err.message);

    res.status(500).json({
      error: err.message
    });
  }
});

// GET ALL CUSTOMERS
router.get("/customers", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {
    console.error("Fetch Error:", err.message);

    res.status(500).json({
      error: err.message
    });
  }
});

export default router;