import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Auth() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    if (!isLogin && name.trim() === "") {
      setError("Enter your name");
      return;
    }

    // Replace with API call later
    login(email);

    navigate("/");
  };

  return (
    <div className="login-page">
      <form
        className="login-card"
        onSubmit={handleSubmit}
      >
        <h1>🎵 EventSphere</h1>

        <p>
          {isLogin
            ? "Welcome Back"
            : "Create Your Account"}
        </p>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <button
          className="btn"
          type="submit"
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </button>

        <p className="toggle-auth">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            className="link-btn"
            onClick={() =>
              setIsLogin(!isLogin)
            }
          >
            {isLogin
              ? " Sign Up"
              : " Sign In"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Auth;