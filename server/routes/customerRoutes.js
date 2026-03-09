import express from "express";
import pool from "../db.js";

const router = express.Router();

/* CREATE CUSTOMER */

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

    const result = await pool.query(
      `INSERT INTO customers(
      customer_name,phone1,phone2,email,state,city,locality,address,
      product,product_type,model_number,serial_number,
      warranty_status,svc_type,complaint_issue
      )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
      RETURNING *`,
      [
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
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Server error" });

  }

});


/* GET ALL CUSTOMERS */

router.get("/customers", async (req, res) => {

  const result = await pool.query(
    "SELECT * FROM customers ORDER BY id DESC"
  );

  res.json(result.rows);

});


/* SEARCH CUSTOMER */

router.get("/search/:phone", async (req, res) => {

  const phone = req.params.phone;

  const result = await pool.query(
    `SELECT * FROM customers
     WHERE phone1=$1 OR phone2=$1`,
    [phone]
  );

  res.json(result.rows);

});

export default router;