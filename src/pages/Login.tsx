import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  onLogin: () => void;
};

const Login = ({ onLogin }: LoginProps) => {
    const navigate = useNavigate(); 
  const [agent_id, setAgentId] = useState("");
  const [password, setPassword] = useState("");


const handleLogin = async () => {
  if (!agent_id || !password) {
    alert("Please enter Agent ID and Password");
    return;
  }

  try {
    const res = await axios.post(
      "https://service-portal-api.onrender.com/agent-login",
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
    <div>
      <h2>Agent Login</h2>

      <input
        placeholder="Agent ID"
        value={agent_id}
        onChange={(e) => setAgentId(e.target.value)}
      />

      <input
        placeholder="Password (DOB)"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;