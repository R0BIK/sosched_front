import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import PropTypes from "prop-types";
import {LoadingIndicator} from "../../view/components/LoadingIndicator.js";

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div className="flex h-screen w-screen justify-center items-center"><LoadingIndicator/></div>;

    if (!user) return <Navigate to="/login" replace />;

    return children;
}

PrivateRoute.propTypes = {
    children: PropTypes.node
}