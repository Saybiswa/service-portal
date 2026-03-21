import { useState, useEffect } from "react";
import "./CustomerForm.css";
import api from "../api";

const CustomerForm = () => {

  const [form, setForm] = useState({
    customer_name: "",
    phone1: "",
    phone2: "",
    email: "",
    pincode: "",
    state: "",
    city: "",
    locality: "",
    address: "",
    product: "",
    product_type: "",
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

  // ==========================
  // 🔍 PINCODE SEARCH
  // ==========================
  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;

  setForm(prev => ({ ...prev, pincode: value }));

  if (value.length >= 2) {
    try {
      const res = await api.get(`/api/pincode?search=${value}`);

      console.log("API DATA:", res.data); // 👈 DEBUG

      // ✅ FIX HERE
      
      if (Array.isArray(res.data)) {
        setSuggestions(res.data);
      } else {
        setSuggestions([]); // fallback
      }

    } catch (err) {
      console.error(err);
      setSuggestions([]); // ✅ IMPORTANT
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

  // ❌ CLOSE DROPDOWN
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
  // NORMAL INPUT
  // ==========================
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ==========================
  // SUBMIT
  // ==========================
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.customer_name || !form.phone1 || !form.phone2 || !form.pincode || !form.product || !form.product_type || !form.svc_type) {
      alert("Fill all required fields ⚠️");
      return;
    }

    try {
      await api.post("/api/customer", form);
      alert("Saved Successfully ✅");

      setForm({
        customer_name: "",
        phone1: "",
        phone2: "",
        email: "",
        pincode: "",
        state: "",
        city: "",
        locality: "",
        address: "",
        product: "",
        product_type: "",
        svc_type: "",
        complaint_issue: ""
      });

    } catch (error) {
  console.error("Submit Error:", error);
  alert("Error saving data ❌");
}
  };

  return (
    <div className="page">
      <div className="form-box">
        <h1>Customer Service Request Registration</h1>

        <form onSubmit={handleSubmit}>

          {/* CUSTOMER */}
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
