import {useAuth} from "../../context/AuthContext.jsx";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import {LoadingIndicator} from "../../view/components/LoadingIndicator.js";

export default function AuthRedirect({ redirectPath = "/schedule", children }) {
    const { user, loading } = useAuth();

    if (loading) return <div className="flex h-screen w-screen justify-center items-center"><LoadingIndicator/></div>;

    if (user) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
}

AuthRedirect.propTypes = {
    redirectPath: PropTypes.string,
    children: PropTypes.node.isRequired,
};