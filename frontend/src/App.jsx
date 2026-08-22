import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

/* =========================================================
   LOGIN PAGE
========================================================= */

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      // Save JWT
      const token = data.token || data.accessToken;

      if (!token) {
        setError("Login successful but no token was received.");
        return;
      }

      localStorage.setItem("token", token);

      // Go to profile
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Cannot connect to backend. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-blue-600">
          Dayflow
        </h1>

        <p className="mt-2 text-xl text-gray-500">
          Human Resource Management System
        </p>

        <form onSubmit={handleLogin} className="mt-10">

          {/* Email */}
          <div>
            <label className="block mb-2 text-lg font-medium">
              Email
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-gray-300 px-5 py-4 text-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="mt-7">
            <label className="block mb-2 text-lg font-medium">
              Password
            </label>

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-gray-300 px-5 py-4 text-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full rounded-xl bg-blue-600 py-4 text-xl font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <div className="mt-7 text-center">

  <Link
    to="/forgot-password"
    className="text-sm font-medium text-blue-600 hover:underline"
  >
    Forgot Password?
  </Link>

  <p className="mt-3 text-lg text-gray-500">
    Don't have an account?{" "}

    <Link
      to="/signup"
      className="font-semibold text-blue-600 hover:underline"
    >
      Sign Up
    </Link>
  </p>

</div>

      </div>

    </div>
  );
}
/* =========================================================
   FORGOT PASSWORD PAGE
========================================================= */

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to process request");
        return;
      }

      setMessage(
        data.message ||
          "If the email exists, a password reset link has been sent."
      );
    } catch (error) {
      console.error(error);

      setError(
        "Cannot connect to backend. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-xl">

        <h1 className="text-3xl font-bold text-blue-600">
          Forgot Password?
        </h1>

        <p className="mt-2 text-gray-500">
          Enter your email and we'll help you reset your password.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">

          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:border-blue-500 focus:outline-none"
          />

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-green-600">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 w-full text-center text-blue-600 hover:underline"
        >
          Back to Login
        </button>

      </div>

    </div>
  );
}

/* =========================================================
   RESET PASSWORD PAGE
========================================================= */

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to reset password.");
        return;
      }

      setMessage("Password reset successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error);

      setError(
        "Cannot connect to backend. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-xl">

        <h1 className="text-3xl font-bold text-blue-600">
          Reset Password
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new password for your Dayflow account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">

          <label className="block mb-2 font-medium">
            New Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
            className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:border-blue-500 focus:outline-none"
          />

          <label className="block mb-2 mt-6 font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
            className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:border-blue-500 focus:outline-none"
          />

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-green-600">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 w-full text-center text-blue-600 hover:underline"
        >
          Back to Login
        </button>

      </div>

    </div>
  );
}
/* =========================================================
   SIGNUP PAGE
========================================================= */

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    employeeId: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setMessage(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("Registration error:", error);

      setError(
        "Cannot connect to backend. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-blue-600">
          Create Account
        </h1>

        <p className="mt-2 text-xl text-gray-500">
          Join Dayflow
        </p>

        <form onSubmit={handleSignup} className="mt-10">

          {/* First + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              required
              className="rounded-xl border border-gray-300 px-5 py-4 text-lg"
            />

            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              required
              className="rounded-xl border border-gray-300 px-5 py-4 text-lg"
            />

          </div>

          {/* Employee ID */}
          <input
            name="employeeId"
            value={form.employeeId}
            onChange={handleChange}
            placeholder="Employee ID"
            required
            className="mt-5 w-full rounded-xl border border-gray-300 px-5 py-4 text-lg"
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="mt-5 w-full rounded-xl border border-gray-300 px-5 py-4 text-lg"
          />

          {/* Password */}
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            minLength={6}
            className="mt-5 w-full rounded-xl border border-gray-300 px-5 py-4 text-lg"
          />

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {message && (
            <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-green-600">
              {message}
            </div>
          )}

          {/* Create Account */}
          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full rounded-xl bg-blue-600 py-4 text-xl font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <p className="mt-7 text-center text-lg text-gray-500">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign In
          </Link>

        </p>

      </div>

    </div>
  );
}


/* =========================================================
   EMPLOYEE PROFILE
========================================================= */

function Profile() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/employees/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load profile"
          );
        }

        // Supports either:
        // { employee: {...} }
        // or directly {...}
        setEmployee(data.employee || data);

      } catch (error) {
        console.error("Profile error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-xl text-gray-600">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
          <p className="font-semibold">
            Failed to load profile
          </p>

          <p className="mt-2">
            {error}
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            Back to Login
          </button>
        </div>

      </div>
    );
  }

  const user = employee?.userId || employee?.user || {};

  return (
    <div className="min-h-screen bg-slate-100">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="border-b bg-white px-6 py-4 md:px-10">

        <div className="mx-auto flex max-w-6xl items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              Dayflow
            </h1>

            <p className="text-sm text-gray-500">
              Human Resource Management System
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={() => navigate("/edit-profile")}
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-red-200 px-4 py-2 font-medium text-red-600 hover:bg-red-50"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-6xl px-6 py-8">

        {/* Profile Header */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">

            {/* Avatar */}
            {/* Avatar */}
<div className="relative">

  {employee?.profilePicture ? (
    <img
      src={employee.profilePicture}
      alt="Profile"
      className="h-24 w-24 rounded-full object-cover"
    />
  ) : (
    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-4xl font-bold text-blue-600">
      {employee?.firstName?.charAt(0)?.toUpperCase() || "E"}
    </div>
  )}

</div>
<button
  onClick={() => navigate("/edit-profile")}
  className="mt-3 text-sm font-medium text-blue-600 hover:underline"
>
  Change photo
</button>
            {/* Name */}
            <div>

              <h2 className="text-3xl font-bold text-gray-900">

                {employee?.firstName || ""}
                {" "}
                {employee?.lastName || ""}

              </h2>

              <p className="mt-1 text-gray-500">
                Employee ID:{" "}
                {employee?.employeeId || "Not provided"}
              </p>

              <span className="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">

                {user?.role || "employee"}

              </span>

            </div>

          </div>

        </div>


        {/* =====================================================
            PERSONAL + ACCOUNT DETAILS
        ===================================================== */}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Personal Details */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-xl font-bold text-gray-900">
              Personal Details
            </h3>

            <div className="space-y-5">

              <Info
                label="First Name"
                value={employee?.firstName}
              />

              <Info
                label="Last Name"
                value={employee?.lastName}
              />

              <Info
                label="Phone"
                value={employee?.phone}
              />

              <Info
                label="Address"
                value={employee?.address}
              />

            </div>

          </div>


          {/* Account Details */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h3 className="mb-5 text-xl font-bold text-gray-900">
              Account Details
            </h3>

            <div className="space-y-5">

              <Info
                label="Employee ID"
                value={employee?.employeeId}
              />

              <Info
                label="Email"
                value={user?.email || employee?.email}
              />

              <Info
                label="Role"
                value={user?.role || "employee"}
              />

              <Info
                label="Department"
                value={employee?.department}
              />

            </div>

          </div>

        </div>


        {/* =====================================================
            EMPLOYEE 360
        ===================================================== */}

        <section className="mt-8">

          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            Employee 360
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

            {/* Attendance */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <p className="text-sm font-medium text-gray-500">
                Attendance
              </p>

              <p className="mt-2 text-4xl font-bold text-green-600">
                --
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Attendance module
              </p>

            </div>


            {/* Leave */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <p className="text-sm font-medium text-gray-500">
                Leave Balance
              </p>

              <p className="mt-2 text-4xl font-bold text-blue-600">
                --
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Leave module
              </p>

            </div>


            {/* Salary */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <p className="text-sm font-medium text-gray-500">
                Salary
              </p>

              <p className="mt-2 text-4xl font-bold text-purple-600">
                {employee?.salary
                  ? `₹${employee.salary}`
                  : "--"}
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Payroll information
              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            DOCUMENTS
        ===================================================== */}

        <section className="mt-8">

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-900">
              Documents
            </h2>

            <p className="mt-2 text-gray-500">
              Employee documents will appear here.
            </p>

            <div className="mt-5 rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">

              <p className="text-gray-400">
                No documents uploaded yet.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            RECENT ACTIVITY
        ===================================================== */}

        <section className="mt-8">

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-900">
              Recent Activity
            </h2>

            <div className="mt-5">

              <div className="rounded-lg bg-gray-50 p-4">

                <p className="font-medium text-gray-700">
                  Account created
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Employee joined Dayflow
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}


/* =========================================================
   SMALL INFO COMPONENT
========================================================= */

function Info({ label, value }) {
  return (
    <div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-medium text-gray-900">
        {value || "Not provided"}
      </p>

    </div>
  );
}


/* =========================================================
   EDIT PROFILE
========================================================= */

function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* -------------------------------------------------------
     LOAD CURRENT PROFILE
  ------------------------------------------------------- */

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const loadProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/employees/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load profile"
          );
        }

        const employee = data.employee || data;

        setForm({
          firstName: employee?.firstName || "",
          lastName: employee?.lastName || "",
          phone: employee?.phone || "",
          address: employee?.address || "",
        });

      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();

  }, [navigate]);


  /* -------------------------------------------------------
     INPUT CHANGE
  ------------------------------------------------------- */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  /* -------------------------------------------------------
     SAVE PROFILE
  ------------------------------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/employees/me",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update profile"
        );
      }

      setMessage("Profile updated successfully!");

      setTimeout(() => {
        navigate("/profile");
      }, 1000);

    } catch (error) {
      console.error("Update profile error:", error);

      setError(error.message);

    } finally {
      setSaving(false);
    }
  };


  /* -------------------------------------------------------
     LOADING
  ------------------------------------------------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <p className="text-xl text-gray-600">
          Loading profile...
        </p>

      </div>
    );
  }


  /* -------------------------------------------------------
     PAGE
  ------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">

      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-xl">

        {/* Header */}
        <div>

          <h1 className="text-3xl font-bold text-blue-600">
            Edit Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Update your personal information
          </p>

        </div>


        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* First Name */}
          <div>

            <label className="mb-2 block font-medium">
              First Name
            </label>

            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />

          </div>


          {/* Last Name */}
          <div>

            <label className="mb-2 block font-medium">
              Last Name
            </label>

            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />

          </div>


          {/* Phone */}
          <div>

            <label className="mb-2 block font-medium">
              Phone
            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />

          </div>


          {/* Address */}
          <div>

            <label className="mb-2 block font-medium">
              Address
            </label>

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="4"
              placeholder="Enter address"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />

          </div>


          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}


          {/* Success */}
          {message && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-600">
              {message}
            </div>
          )}


          {/* Buttons */}
          <div className="flex gap-3 pt-3">

            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex-1 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}


/* =========================================================
   APP ROUTES
========================================================= */

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
  path="/forgot-password"
  element={<ForgotPassword />}

  
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Edit Profile */}
        <Route
          path="/edit-profile"
          element={<EditProfile />}
        />

      </Routes>

    </BrowserRouter>
  );
}


/* =========================================================
   EXPORT
========================================================= */

export default App;