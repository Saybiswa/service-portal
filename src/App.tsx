import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CustomerForm from "./pages/CustomerForm";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerList from "./pages/CustomerList";
import { useState } from "react";

function App() {
  
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 Login */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/form" />
            ) : (
              <Login onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />

        {/* 📝 Customer Form */}
        <Route
          path="/form"
          element={isLoggedIn ? <CustomerForm /> : <Navigate to="/" />}
        />

        {/* 📋 Customer List */}
        <Route
          path="/customers"
          element={isLoggedIn ? <CustomerList /> : <Navigate to="/" />}
        />

        {/* 🛠 Admin */}
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;