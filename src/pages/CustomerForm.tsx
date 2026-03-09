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

const productTypes:any = {

"Washing Machine":[
"Semi Automatic",
"Top Load",
"Front Load"
],

"Refrigerator":[
"Single Door",
"Double Door",
"Side by Side"
],

"AC":[
"Split AC",
"Window AC"
],

"TV":[
"LED",
"Smart TV"
],

"Water Purifier":[
"RO",
"UV",
"RO + UV"
]

};

const handleChange = (e:any) => {

const { name, value } = e.target;

setForm({
...form,
[name]: value
});

};

const handleSubmit = async (e:any) => {

e.preventDefault();

if(
!form.customer_name ||
!form.phone1 ||
!form.phone2 ||
!form.address ||
!form.product ||
!form.product_type ||
!form.svc_type
){
alert("Please fill all mandatory fields ⚠️");
return;
}

try {

await axios.post("http://localhost:5000/api/customer", form);

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
alert("Error saving data");

}

};

return (

<div className="page">

<div className="form-box">

<h1>Customer Service Request Registration</h1>
<p className="subtitle">Fill Up The Details</p>

<form onSubmit={handleSubmit}>

{/* CUSTOMER DETAILS */}

<div className="section">

<h3>Customer Details</h3>

<input
name="customer_name"
value={form.customer_name}
placeholder="Customer Name *"
onChange={handleChange}
required
/>

<input
name="phone1"
value={form.phone1}
placeholder="Phone Number 1 *"
onChange={handleChange}
required
/>

<input
name="phone2"
value={form.phone2}
placeholder="Phone Number 2 *"
onChange={handleChange}
required
/>

<input
name="email"
value={form.email}
placeholder="Customer Email ID"
onChange={handleChange}
/>

</div>

{/* ADDRESS */}

<div className="section">

<h3>Address Details</h3>

<input
name="state"
value={form.state}
placeholder="State"
onChange={handleChange}
/>

<input
name="city"
value={form.city}
placeholder="City"
onChange={handleChange}
/>

<input
name="locality"
value={form.locality}
placeholder="Locality"
onChange={handleChange}
/>

<textarea
name="address"
value={form.address}
placeholder="Full Address *"
onChange={handleChange}
required
/>

</div>

{/* PRODUCT DETAILS */}

<div className="section">

<h3>Product Details</h3>

<select
name="product"
value={form.product}
onChange={handleChange}
required
>

<option value="">Select Product *</option>
<option value="Washing Machine">Washing Machine</option>
<option value="Refrigerator">Refrigerator</option>
<option value="AC">AC</option>
<option value="TV">TV</option>
<option value="Water Purifier">Water Purifier</option>

</select>

<select
name="product_type"
value={form.product_type}
onChange={handleChange}
required
>

<option value="">Select Product Type *</option>

{productTypes[form.product]?.map((type:string,index:number)=>(
<option key={index} value={type}>
{type}
</option>
))}

</select>

<input
name="model_number"
value={form.model_number}
placeholder="Model Number"
onChange={handleChange}
/>

<input
name="serial_number"
value={form.serial_number}
placeholder="Serial Number"
onChange={handleChange}
/>

</div>

{/* SERVICE DETAILS */}

<div className="section">

<h3>Service Details</h3>

<select
name="warranty_status"
value={form.warranty_status}
onChange={handleChange}
>

<option value="">Warranty Status</option>
<option value="In Warranty">In Warranty</option>
<option value="Out of Warranty">Out of Warranty</option>

</select>

<select
name="svc_type"
value={form.svc_type}
onChange={handleChange}
required
>

<option value="">Service Type *</option>
<option value="Installation">Installation</option>
<option value="Repair">Repair</option>
<option value="Maintenance">Maintenance</option>

</select>

<textarea
name="complaint_issue"
value={form.complaint_issue}
placeholder="Complaint / Issue"
onChange={handleChange}
/>

</div>

<button type="submit" className="submit-btn">
Submit
</button>

</form>

</div>

</div>

);

};

export default CustomerForm;