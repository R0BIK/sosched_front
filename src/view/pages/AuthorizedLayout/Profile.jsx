import EditProfile from "../../components/Profile/EditProfile.jsx";
import PropTypes from "prop-types";
import ViewProfile from "../../components/Profile/ViewProfile.jsx";
import {Navigate, useParams} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext.jsx";
import {useSpace} from "../../../context/SpaceContext.jsx";
import {useUserById} from "../../../tanStackQueries/user/useUserById.js";
import {LoadingIndicator} from "../../components/LoadingIndicator.js";

export default function Profile({ isEdit=false }) {
    const { id: id } = useParams();

    const { activeSpace } = useSpace()
    const { user, logout } = useAuth();

    const domain = activeSpace?.domain;
    const userId = Number(id);

    const { data: userData, isLoading, isError } = useUserById(userId, domain);

    if (!userId) return <Navigate to={`/profile/${user.id}`} replace />;

    if (isError) {
        return (
            <div className="flex h-full justify-center items-center text-3xl">
                Користувача не знайдено
            </div>
        )
    }

    if (isLoading || !userData) return <LoadingIndicator type="line-simple" size="md" label="Loading..." />;


    const isOwner = user?.id === userId;

    const handleLogout = async () => {
        await logout();
    }

    const handleEditProfile = () => {

    }


    return (
        <div className="w-full flex justify-center font-noto pt-5 px-5 pb-20">
            {!isEdit && (
                <ViewProfile user={userData} isOwner={isOwner} handleLogout={handleLogout} handleEditProfile={handleEditProfile} />
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