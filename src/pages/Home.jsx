const API_BASE_URL = "https://bls-backend.vercel.app";

import { Component } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import CreditScore from "./CreditScore";
import "../App.css";

const optionList = [
  { optionId: "dashboard", displayText: "📊 Dashboard" },
  { optionId: "credit-score", displayText: "💳 Credit Score" },
  { optionId: "create-loan", displayText: "Create Loan" },
];

class Home extends Component {
  state = {
    activeOptionId: "dashboard",
    shouldLogout: false,
    userData: null,
  };

  componentDidMount() {
    this.fetchUserData();
  }

  // ✅ PROTECT ROUTE
  isAuthenticated = () => {
    return localStorage.getItem("token");
  };

  fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        this.setState({ userData: data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ shouldLogout: true });
  };

  onChangeOptions = (e) => {
    this.setState({ activeOptionId: e.target.value });
  };

  render() {
    // ✅ If not logged in → go to login
    if (!this.isAuthenticated()) {
      return <Navigate to="/login" />;
    }

    // ✅ After logout
    if (this.state.shouldLogout) {
      return <Navigate to="/login" />;
    }

    const { activeOptionId, userData } = this.state;

    return (
      <div className="container">
        <h1>BANK SYSTEM</h1>

        {userData && (
          <div>
            <p>Welcome, {userData.name}</p>
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        )}

        <select value={activeOptionId} onChange={this.onChangeOptions}>
          {optionList.map((opt) => (
            <option key={opt.optionId} value={opt.optionId}>
              {opt.displayText}
            </option>
          ))}
        </select>

        {activeOptionId === "dashboard" && <Dashboard />}
        {activeOptionId === "credit-score" && <CreditScore />}
        {activeOptionId === "create-loan" && <p>Create Loan Form Here</p>}
      </div>
    );
  }
}

export default Home;
