import { useState, useEffect } from "react"; // ✅ add useEffect
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

type LoginProps = {
  onLogin: () => void;
};

const Login = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate();

  const [agent_id, setAgentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ CLEAR OLD AUTO-FILL VALUES
  useEffect(() => {
    setAgentId("");
    setPassword("");
  }, []);

  const handleLogin = async () => {
    if (!agent_id || !password) {
      alert("Please enter Agent ID and Password");
      return;
    }

    try {
      const res = await axios.post(
        "https://service-portal-api.onrender.com/api/agent-login",
        { agent_id, password }
      );

      localStorage.setItem("agent_id", agent_id);
      localStorage.setItem("agent_name", res.data.employee_name);

      onLogin();
      navigate("/form");

    } catch (error: any) {
      alert(error.response?.data?.message || "Invalid Login ❌");
    }
  };

  return (
    <div className="login-page">
      
      <div className="login-left">
        <h2>Agent Login</h2>

        {/* ✅ DISABLE AUTOFILL */}
        <input
          name="agent_id_field"
          autoComplete="off"
          placeholder="Agent ID"
          value={agent_id}
          onChange={(e) => setAgentId(e.target.value)}
        />

        {/* ✅ PASSWORD FIELD WITH FULL FIX */}
        <div style={{ position: "relative" }}>
          <input
            name="agent_pass_field" // ✅ change name (important)
            autoComplete="new-password" // ✅ block autofill
            placeholder="Password (DOB)"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#007bff",
              fontSize: "12px"
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button onClick={handleLogin}>Login</button>
      </div>

      <div className="login-right"></div>
    </div>
  );
};

export default Login;