import { useEffect, useState } from "react";
import axios from "axios";

interface Customer {
  id: number;
  name: string;
  mobile: string;
  product_name: string;
  product_model: string;
}

const AdminDashboard = () => {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [mobile, setMobile] = useState("");

  useEffect(() => {

    const fetchCustomers = async () => {

      try {

        const res = await axios.get<Customer[]>(
          "http://localhost:5000/api/customer"
        );

        setCustomers(res.data);

      } catch (error) {

        console.error("Error loading customers:", error);

      }

    };

    fetchCustomers();

  }, []);

  const searchCustomer = async () => {

    if (!mobile) return;

    try {

      const res = await axios.get<Customer[]>(
        `http://localhost:5000/api/search/${mobile}`
      );

      setCustomers(res.data);

    } catch (error) {

      console.error("Search error:", error);

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h2>Customer Dashboard</h2>

      <input
        type="text"
        placeholder="Search by Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />

      <button onClick={searchCustomer}>Search</button>

      <br /><br />

      <table border={1} cellPadding={8}>

        <thead>

          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Product</th>
            <th>Model</th>
          </tr>

        </thead>

        <tbody>

          {customers.length === 0 ? (

            <tr>
              <td colSpan={4}>No customers found</td>
            </tr>

          ) : (

            customers.map((c) => (

              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.mobile}</td>
                <td>{c.product_name}</td>
                <td>{c.product_model}</td>
              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

};

export default AdminDashboard;