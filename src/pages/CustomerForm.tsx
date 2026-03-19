import { useState } from "react";
//import axios from "axios";
import "./CustomerForm.css";
import api from "../api";
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
     await api.post("/api/customer", form);
      alert("Customer Registered Successfully 🎉");

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
        

        <form onSubmit={handleSubmit}>
          
          {/* Customer Details */}
          <div className="section">
            

            <div className="input-row">
              <label>Customer Name <span className="required">*</span></label>
              <input name="customer_name" value={form.customer_name} onChange={handleChange} />
            </div>

            <div className="input-row">
              <label>Phone Number 1 <span className="required">*</span></label>
              <input name="phone1" value={form.phone1} onChange={handleChange} />
            </div>

            <div className="input-row">
              <label>Phone Number 2 <span className="required">*</span></label>
              <input name="phone2" value={form.phone2} onChange={handleChange} />
            </div>

            <div className="input-row">
              <label>Email</label>
              <input name="email" value={form.email} onChange={handleChange} />
            </div>
          </div>

          {/* Address Details */}
          <div className="section">
            

            <div className="input-row">
              <label>State <span className="required">*</span></label>
              <input name="state" value={form.state} onChange={handleChange} />
            </div>

            <div className="input-row">
              <label>City <span className="required">*</span></label>
              <input name="city" value={form.city} onChange={handleChange} />
            </div>

            <div className="input-row">
              <label>Locality <span className="required">*</span></label>
              <input name="locality" value={form.locality} onChange={handleChange} />
            </div>

            <div className="input-row">
              <label>Full Address <span className="required">*</span></label>
              <textarea name="address" value={form.address} onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Product Details */}
          <div className="section">
            <div className="input-row">
              <label>Product <span className="required">*</span></label>
              <select name="product" value={form.product} onChange={handleChange}>
                <option value="">Select Product *</option>
                {Object.keys(productTypes).map((prod, idx) => <option key={idx} value={prod}>{prod}</option>)}
              </select>
            </div>

            <div className="input-row">
              <label>Product Type <span className="required">*</span></label>
              <select name="product_type" value={form.product_type} onChange={handleChange}>
                <option value="">Select Product Type *</option>
                {form.product && productTypes[form.product]?.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
              </select>
            </div>

            <div className="input-row">
              <label>Model Number</label>
              <input name="model_number" value={form.model_number} onChange={handleChange} />
            </div>

            <div className="input-row">
              <label>Serial Number</label>
              <input name="serial_number" value={form.serial_number} onChange={handleChange} />
            </div>
          </div>

          {/* Service Details */}
          <div className="section">
            <div className="input-row">
              <label>Warranty Status</label>
              <select name="warranty_status" value={form.warranty_status} onChange={handleChange}>
                <option value="">Select Warranty</option>
                <option value="In Warranty">In Warranty</option>
                <option value="Out of Warranty">Out of Warranty</option>
              </select>
            </div>

            <div className="input-row">
              <label>Service Type <span className="required">*</span></label>
              <select name="svc_type" value={form.svc_type} onChange={handleChange}>
                <option value="">Select Service</option>
                <option value="Installation">Installation</option>
                <option value="Repair">Repair</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div className="input-row">
              <label>Complaint / Issue</label>
              <textarea name="complaint_issue" value={form.complaint_issue} onChange={handleChange}></textarea>
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;