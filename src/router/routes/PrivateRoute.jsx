import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import PropTypes from "prop-types";

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    // console.log(user);

    if (loading) return <p>Loading...</p>;
    if (!user.data) return <Navigate to="/SignIn" replace />;

    return children;
}

PrivateRoute.propTypes = {
    children: PropTypes.node
}