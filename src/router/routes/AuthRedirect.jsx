import {useAuth} from "../../context/AuthContext.jsx";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

export default function AuthRedirect({ redirectPath = "/schedule", children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (user) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
}

AuthRedirect.propTypes = {
    redirectPath: PropTypes.string,
    children: PropTypes.node.isRequired,
};