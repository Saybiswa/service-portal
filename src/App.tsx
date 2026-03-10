import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerForm from "./pages/CustomerForm";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerList from "./pages/CustomerList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerForm />} />
        <Route path="/" element={<CustomerList />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;