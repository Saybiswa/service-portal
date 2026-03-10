// CustomerForm.tsx
import { useState } from "react";
import axios from "axios";
import "./CustomerForm.css";

const CustomerForm = () => {
  const [form, setForm] = useState({
    customer_name: "",
    phone1: "",
    phone2: "",
    email: "",
    state: "",
    city: "",
    locality: "",
    address: "",
    product: "",
    product_type: "",
    model_number: "",
    serial_number: "",
    warranty_status: "",
    svc_type: "",
    complaint_issue: ""
  });

  const productTypes: Record<string, string[]> = {
    "Washing Machine": ["Semi Automatic","Top Load","Front load","Front Load with Dryer","Twin wash (front)","Twin wash (Top)","Dishwasher","Dryer"],
    "Refrigerator": ["Direct Cool (Single Door)","Upto 300 Ltr (double)","301 to 400 Ltr (double)","401 to 500 Ltr (double)","Above 500 Ltr (double)","DIOS SXS","Insta View"],
    "Air conditioner": ["Split AC (Inverter Model)(1 Ton)","Split AC (Inverter Model)(1.5 Ton)","Split AC (Inverter Model)(2 Ton)","Split AC (Non Inverter)(1 Ton)","Split AC (Non Inverter)(1.5 Ton)","Split AC (Non Inverter)(2 Ton)","Window (1 Ton)","Window (1.5 Ton)","Window (2 Ton)","Tower","Art cool","Multi Split/Floor Standing"],
    "TV": ["UP TO 25 LED/CRT","26 to 28 LED","32 TV UHD/FHD/HD","43 TV UHD/FHD/HD","50 TV UHD/FHD/HD","55 TV UHD/FHD/HD","65 TV UHD/FHD/HD","70 TV UHD/FHD/HD","75 TV UHD/FHD/HD","86 TV UHD/FHD/HD"],
    "Microwave": ["SOLO","GRILL","CONVECTION UPTO 28L","CONVECTION 32L"],
    "Water Purifier": ["Basic RO","RO+UF","RO+UF+UV","Hot and Cold","Non-RO","RO+UV"],
    "Monitor": ["16 Monitor","19 Monitor","20 Monitor","22 Monitor","23 Monitor","24 Monitor","27 Monitor","32 Monitor"],
    "Audio Video": ["Home Theatre","Sound Bar","Audio System","DVD Player/Blu Ray Disc Player","Wireless Speaker","Portable Speaker","X-Boom / DJ System"],
    "Air Cleaner": ["Air Cleaner (AS40GWWK0)","Air Cleaner (AS60GDWT0)","Air Cleaner (AS95GDWT0)","Wearable Mask"]
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mandatory field check
    if(!form.customer_name || !form.phone1 || !form.phone2 || !form.state || !form.city || !form.locality || !form.address || !form.product || !form.product_type || !form.svc_type){
      alert("Please fill all mandatory fields ⚠️");
      return;
    }

    try {
      await axios.post("https://service-portal-api.onrender.com/api/customer", form, { withCredentials: true });
      alert("Customer Registered Successfully 🎉");

      // Reset form
      setForm({
        customer_name: "",
        phone1: "",
        phone2: "",
        email: "",
        state: "",
        city: "",
        locality: "",
        address: "",
        product: "",
        product_type: "",
        model_number: "",
        serial_number: "",
        warranty_status: "",
        svc_type: "",
        complaint_issue: ""
      });

    } catch (error) {
      console.error(error);
      alert("Error saving data. Please try again.");
    }
  };

  return (
    <div className="page">
      <div className="form-box">
        <h1>Customer Service Request Registration</h1>
        <p className="subtitle">Fill Up The Details</p>

        <form onSubmit={handleSubmit}>
          {/* Customer Details */}
          <div className="section">
            <h3>Customer Details</h3>
            <input name="customer_name" value={form.customer_name} placeholder="Customer Name *" onChange={handleChange} required />
            <input name="phone1" value={form.phone1} placeholder="Phone Number 1 *" onChange={handleChange} required />
            <input name="phone2" value={form.phone2} placeholder="Phone Number 2 *" onChange={handleChange} required />
            <input name="email" value={form.email} placeholder="Customer Email ID" onChange={handleChange} />
          </div>

          {/* Address */}
          <div className="section">
            <h3>Address Details</h3>
            <input name="state" value={form.state} placeholder="State *" onChange={handleChange} required />
            <input name="city" value={form.city} placeholder="City *" onChange={handleChange} required />
            <input name="locality" value={form.locality} placeholder="Locality *" onChange={handleChange} required />
            <textarea name="address" value={form.address} placeholder="Full Address *" onChange={handleChange} required />
          </div>

          {/* Product Details */}
          <div className="section">
            <h3>Product Details</h3>
            <select name="product" value={form.product} onChange={handleChange} required>
              <option value="">Select Product *</option>
              {Object.keys(productTypes).map((prod, idx) => <option key={idx} value={prod}>{prod}</option>)}
            </select>

            <select name="product_type" value={form.product_type} onChange={handleChange} required>
              <option value="">Select Product Type *</option>
              {form.product && productTypes[form.product]?.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
            </select>

            <input name="model_number" value={form.model_number} placeholder="Model Number" onChange={handleChange} />
            <input name="serial_number" value={form.serial_number} placeholder="Serial Number" onChange={handleChange} />
          </div>

          {/* Service Details */}
          <div className="section">
            <h3>Service Details</h3>
            <select name="warranty_status" value={form.warranty_status} onChange={handleChange}>
              <option value="">Warranty Status</option>
              <option value="In Warranty">In Warranty</option>
              <option value="Out of Warranty">Out of Warranty</option>
            </select>

            <select name="svc_type" value={form.svc_type} onChange={handleChange} required>
              <option value="">Service Type *</option>
              <option value="Installation">Installation</option>
              <option value="Repair">Repair</option>
              <option value="Maintenance">Maintenance</option>
            </select>

            <textarea name="complaint_issue" value={form.complaint_issue} placeholder="Complaint / Issue" onChange={handleChange} />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;