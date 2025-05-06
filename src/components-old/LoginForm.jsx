// import React, { useState } from "react";
// import axios from "axios";

// const LoginForm = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     try {
//       const response = await axios.post("http://localhost:8000/login", form);
//       setMessage(response.data.message);
//       // You can store user info in localStorage or state here
//       console.log("User info:", response.data);
//     } catch (error) {
//       setMessage(error.response?.data?.detail || "Login failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />
//         <button type="submit" style={styles.button}>Login</button>
//         {message && <p style={styles.message}>{message}</p>}
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "400px",
//     margin: "100px auto",
//     padding: "2rem",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     textAlign: "center"
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "1rem"
//   },
//   input: {
//     padding: "0.5rem",
//     fontSize: "1rem"
//   },
//   button: {
//     padding: "0.6rem",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer"
//   },
//   message: {
//     marginTop: "1rem",
//     fontWeight: "bold"
//   }
// };

// export default LoginForm;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/login", formData);
      alert("✅ Login successful!");
      // Navigate to home or dashboard here if needed
    } catch (err) {
      setError("❌ Login failed. Redirecting to register...");
      setTimeout(() => {
        navigate("/register"); // redirect after a short delay
      }, 1500);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button type="submit" style={{ width: "100%" }}>
          Login
        </button>
      </form>
      <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
    </div>
  );
};

export default LoginForm;
