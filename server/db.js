import ExcelJS from "exceljs";

// EXPORT CUSTOMERS TO EXCEL
router.get("/customers/export", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers ORDER BY id DESC");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Customers");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Customer Name", key: "customer_name", width: 25 },
      { header: "Phone 1", key: "phone1", width: 20 },
      { header: "Phone 2", key: "phone2", width: 20 },
      { header: "Email", key: "email", width: 25 },
      { header: "State", key: "state", width: 20 },
      { header: "City", key: "city", width: 20 },
      { header: "Locality", key: "locality", width: 25 },
      { header: "Address", key: "address", width: 30 },
      { header: "Product", key: "product", width: 20 },
      { header: "Product Type", key: "product_type", width: 20 },
      { header: "Model Number", key: "model_number", width: 20 },
      { header: "Serial Number", key: "serial_number", width: 20 },
      { header: "Warranty Status", key: "warranty_status", width: 20 },
      { header: "Service Type", key: "svc_type", width: 20 },
      { header: "Complaint Issue", key: "complaint_issue", width: 30 }
    ];

    result.rows.forEach(row => {
      worksheet.addRow(row);
    });

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
    res.status(500).json({ error: "Server error" });
  }
});