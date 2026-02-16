import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      withCredentials: true
    })
    .then(() => setAuthorized(true))
    .catch(() => setAuthorized(false))
    .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!authorized) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
