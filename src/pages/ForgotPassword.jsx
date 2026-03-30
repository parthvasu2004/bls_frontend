const API_BASE_URL = "https://bls-backend.vercel.app";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_id: "",
    email: "",
    new_password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) return setMessage(data.error);

      setMessage("Password reset success");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setMessage("Error");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={resetPassword}>
        <input name="customer_id" placeholder="Customer ID" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="new_password" placeholder="New Password" onChange={handleChange} required />
        <button>Reset</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
