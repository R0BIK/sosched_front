import EditProfile from "../../components/Profile/EditProfile.jsx";
import PropTypes from "prop-types";
import ViewProfile from "../../components/Profile/ViewProfile.jsx";
import {useParams} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {useSpace} from "../../context/SpaceContext.jsx";
import {useUserById} from "../../tanStackQueries/user/useUserById.js";

export default function Profile({ isEdit=false, isOwner=false }) {
    const { paramId } = useParams();

    const { activeSpace } = useSpace()
    const { user } = useAuth();

    const domain = activeSpace?.domain;
    let userId = user?.id;

    if (!isOwner && paramId) {
        userId = paramId;
    }

    const { data: userData, isLoading, error } = useUserById(userId, domain);

    return (
        <div className="w-full flex justify-center font-noto pt-5 px-5 pb-20">
            {!isEdit && (
                <ViewProfile user={userData} />
            )}
            {isEdit && isOwner && (
                <EditProfile user={userData} />
            )}
        </div>
    )
}

Profile.propTypes = {
    isEdit: PropTypes.bool,
    isOwner: PropTypes.bool,
}