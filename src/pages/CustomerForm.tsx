import { useState, useEffect } from "react";
import "./CustomerForm.css";
import axios from "axios";

const getAgentCredentials = () => {
  
  let agent_id = localStorage.getItem("agent_id");
  let password = localStorage.getItem("agent_password");

  if (!agent_id || !password) {
    agent_id = prompt("Enter Agent ID:") || "";
    password = prompt("Enter Password:") || "";

    if (agent_id && password) {
      localStorage.setItem("agent_id", agent_id);
      localStorage.setItem("agent_password", password);
    }
  }

  return {
    agent_id: agent_id || "",
    password: password || ""
  };
};
const CustomerForm = () => {
   const employeeName = localStorage.getItem("agent_name"); // ✅ FIX

  const creds = getAgentCredentials(); // ✅ GET BOTH VALUES

  const [form, setForm] = useState({
    agent_id: creds.agent_id,   // ✅ FIXED
    password: creds.password,   // ✅ FIXED

    customer_name: "",
    phone1: "",
    phone2: "",
    pincode: "",
    state: "",
    city: "",
    locality: "",
    address: "",
    product: "",
    product_type: "",
    serial_number:"",
    model_number:"",
    warranty_status: "",
    svc_type: "",
    complaint_issue: ""
  });
  const [suggestions, setSuggestions] = useState<any[]>([]);

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

  // ✅ ONLY dropdown close logic here
  useEffect(() => {
    const close = (e: any) => {
      if (!e.target.closest(".pincode-wrapper")) {
        setSuggestions([]);
      }
    };

    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  // ==========================
  // PINCODE SEARCH
  // ==========================
  const handlePincodeChange = async (e: any) => {
    const value = e.target.value;

    setForm(prev => ({ ...prev, pincode: value }));

    if (value.length >= 2) {
      try {
        const res = await axios.get(
          `https://service-portal-api.onrender.com/api/pincode?search=${value}`
        );

        setSuggestions(Array.isArray(res.data) ? res.data : []);
      } catch {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectPincode = (item: any) => {
    setForm(prev => ({
      ...prev,
      pincode: item.pincode,
      city: item.city,
      locality: item.locality,
      state: item.state
    }));
    setSuggestions([]);
  };

  // ==========================
  // INPUT CHANGE
  // ==========================
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // ==========================
  // SUBMIT
  // ==========================
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !form.customer_name ||
      !form.phone1 ||
      !form.phone2 ||
      !form.pincode ||
      !form.product ||
      !form.product_type ||
      !form.warranty_status ||
      !form.svc_type
    ) {
      alert("Fill all required fields ⚠️");
      return;
    }

    try {
      await axios.post(
        "https://service-portal-api.onrender.com/api/customers",
        form
      );

      alert("Saved Successfully ✅");

      // ✅ KEEP agent_id
      setForm(prev => ({
        ...prev,
        customer_name: "",
        phone1: "",
        phone2: "",
        pincode: "",
        state: "",
        city: "",
        locality: "",
        address: "",
        product: "",
        product_type: "",
        serial_number:"",
        model_number:"",
        warranty_status: "",
        svc_type: "",
        complaint_issue: ""
      }));

    } catch (error) {
      console.error("Submit Error:", error);
      alert("Error saving data ❌");
    }
  };

  return (
    <div className="page">
      <div className="form-box">
        <h1>Customer Service Request Registration</h1>
      <h3 style={{ color: "#555", marginBottom: "10px" }}>
    Logged in as: {employeeName}
  </h3>
        <form onSubmit={handleSubmit}>

          {/* CUSTOMER */}
          <div className="section">
            

            <div className="input-row">
              <label>Customer Name <span className="required">*</span></label>
              <input name="customer_name" value={form.customer_name} onChange={handleChange} />
            </div>

            <div className="input-row">
              <label>Primary Number <span className="required">*</span></label>
              <input name="phone1" value={form.phone1} onChange={handleChange} />
            </div>

            <div className="input-row">
              <label>Alternative number <span className="required">*</span></label>
              <input name="phone2" value={form.phone2} onChange={handleChange} />
            </div>
          </div>
          {/* ADDRESS */}
          <div className="section">
<div className="input-row">
<label>Pincode <span className="required">*</span></label>
<div className="pincode-wrapper">
  <input
    name="pincode"
    value={form.pincode}
    onChange={handlePincodeChange}
    onClick={(e) => e.stopPropagation()}
    autoComplete="off"
  />
  

  {suggestions.length > 0 && (
    <ul
      className="dropdown"
      onClick={(e) => e.stopPropagation()}
    >
      {suggestions.map((item, i) => (
        <li key={i} onClick={() => handleSelectPincode(item)}>
          {item.pincode} - {item.locality}, {item.city}
        </li>
      ))}
    </ul>
  )}
</div>
</div>
<div className="input-row">
              <label>State</label>
              <input value={form.state} readOnly />
            </div>
            <div className="input-row">
              <label>City</label>
              <input value={form.city} readOnly />
            </div>

            <div className="input-row">
              <label>Locality</label>
              <input value={form.locality} readOnly />
            </div>

            <div className="input-row">
              <label>Address</label>
              <textarea name="address" value={form.address} onChange={handleChange}></textarea>
            </div>
          </div>

          {/* PRODUCT */}
          <div className="section">
            <div className="input-row">
              <label>Product <span className="required">*</span></label>
              <select name="product" value={form.product} onChange={handleChange}>
                <option value="">Select</option>
                {Object.keys(productTypes).map((p, i) => (
                  <option key={i}>{p}</option>
                ))}
              </select>
            </div>

            <div className="input-row">
              <label>Product Type <span className="required">*</span></label>
              <select name="product_type" value={form.product_type} onChange={handleChange}>
                <option value="">Select</option>
                {form.product &&
                  productTypes[form.product]?.map((t, i) => (
                    <option key={i}>{t}</option>
                  ))}
              </select>
            </div>
            <div className="input-row">
            <label>Serial_Number</label>
              <input name="serial_number" value={form.serial_number} onChange={handleChange} />
            </div>
             <div className="input-row">
            <label>Model_Number</label>
              <input name="model_number" value={form.model_number} onChange={handleChange} />
            </div>
             <div className="input-row">
              <label>Warranty Status<span className="required">*</span></label>
              <select name="warranty_status" value={form.warranty_status} onChange={handleChange}>
                <option value="">Select</option>
                <option>In warranty</option>
                <option>Out of warranty</option>
              </select>
            </div>
          </div>

          {/* SERVICE */}
          <div className="section">
            <div className="input-row">
              <label>Service <span className="required">*</span></label>
              <select name="svc_type" value={form.svc_type} onChange={handleChange}>
                <option value="">Select</option>
                <option>Installation</option>
                <option>Repair</option>
                <option>Maintenance</option>
              </select>
            </div>

            <div className="input-row">
              <label>Complaint</label>
              <textarea name="complaint_issue" value={form.complaint_issue} onChange={handleChange}></textarea>
            </div>
          </div>

          <button className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;