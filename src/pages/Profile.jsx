import TabComponent from "../components/TabComponent.jsx";
import {LockIcon, PersonIcon} from "../img/svg/Icons.jsx";

export default function Profile() {
    return (
        <div className="">
            <div className="p-8">
                <TabComponent text="Акаунт" Icon={PersonIcon} />
                <TabComponent text="Безпека" Icon={LockIcon} />
                <TabComponent text="Загальне" Icon={PersonIcon} />
                <TabComponent text="Загальне" Icon={PersonIcon} />
            </div>
        </div>
    )
}