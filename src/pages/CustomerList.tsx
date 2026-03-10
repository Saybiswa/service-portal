// CustomerList.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerList.css";

interface Customer {
  id: number;
  customer_name: string;
  phone1: string;
  phone2: string;
  email: string;
  state: string;
  city: string;
  locality: string;
  address: string;
  product: string;
  product_type: string;
  model_number: string;
  serial_number: string;
  warranty_status: string;
  svc_type: string;
  complaint_issue: string;
}

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("https://service-portal-api.onrender.com/api/customers");
        setCustomers(res.data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <p>Loading customers...</p>;
  if (!customers.length) return <p>No customers found.</p>;

  return (
    <div className="customer-list">
      <h2>Registered Customers</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone 1</th>
            <th>Phone 2</th>
            <th>Email</th>
            <th>Product</th>
            <th>Service Type</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.customer_name}</td>
              <td>{c.phone1}</td>
              <td>{c.phone2}</td>
              <td>{c.email}</td>
              <td>{c.product} - {c.product_type}</td>
              <td>{c.svc_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;