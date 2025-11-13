import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import PropTypes from "prop-types";

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/SignIn" replace />;

    return children;
}

PrivateRoute.propTypes = {
    children: PropTypes.node
}