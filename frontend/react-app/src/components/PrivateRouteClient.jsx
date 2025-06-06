import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRouteClient = ({ children }) => {
  const token = sessionStorage.getItem("clientToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      sessionStorage.removeItem("clientToken");
      sessionStorage.removeItem("clientUser");
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (error) {
    console.error("Token inválido (cliente):", error);
    sessionStorage.removeItem("clientToken");
    sessionStorage.removeItem("clientUser");
    return <Navigate to="/login" replace />;
  }
};

PrivateRouteClient.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRouteClient;
