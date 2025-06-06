import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("Token");

  if (!token) {
    return <Navigate to="/employee" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      sessionStorage.removeItem("Token");
      sessionStorage.removeItem("User");
      return <Navigate to="/employee" replace />;
    }

    return children;
  } catch (error) {
    console.error("Token inválido:", error);
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("User");
    return <Navigate to="/employee" replace />;
  }
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;

