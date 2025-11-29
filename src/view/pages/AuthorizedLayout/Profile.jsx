import EditProfile from "../../components/Profile/EditProfile.jsx";
import PropTypes from "prop-types";
import ViewProfile from "../../components/Profile/ViewProfile.jsx";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext.jsx";
import {useSpace} from "../../../context/SpaceContext.jsx";
import {useGetUserById} from "../../../tanStackQueries/user/useGetUserById.js";
import {LoadingIndicator} from "../../components/LoadingIndicator.js";

export default function Profile({ isEdit=false }) {
    const { id: paramId } = useParams();
    const navigate = useNavigate();

    const { activeSpace } = useSpace()
    const { user, logout } = useAuth();

    const domain = activeSpace?.domain;

    const routeUserId = Number(paramId);
    const currentUserId = user?.id;

    const userId = paramId ? routeUserId : currentUserId;

    const { data: userData, isLoading, isError } = useGetUserById(userId, domain);

    if (routeUserId === currentUserId) {
        return <Navigate to="/profile" replace />;
    }

    const isOwner = currentUserId === userId;

    if (isError) {
        return (
            <div className="flex h-full justify-center items-center text-3xl">
                Користувача не знайдено
            </div>
        )
    }

    if (isLoading || !userData) return <LoadingIndicator type="line-simple" size="md" label="Loading..." />;

    const handleLogout = async () => {
        await logout();
    }

    const handleEditProfile = () => {
        navigate("/profile/edit");
    }

    const handleViewCalendar = () => {
        navigate(`/schedule/${userId}`);
    }

    return (
        <div className="w-full flex justify-center font-noto pt-5 px-5 pb-20">
            {!isEdit && (
                <ViewProfile user={userData} isOwner={isOwner} handleLogout={handleLogout} handleEditProfile={handleEditProfile} handleViewCalendar={handleViewCalendar}/>
            )}
            {isEdit && isOwner && (
                <EditProfile user={userData} />
            )}
        </div>
    )
}

Profile.propTypes = {
    isEdit: PropTypes.bool,
}