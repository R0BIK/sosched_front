import TabComponent from "../components/TabComponent.jsx";
import {PersonIcon} from "../img/svg/Icons.jsx";
import {Outlet} from "react-router-dom";

export default function SpaceConfiguration() {
    return (
        <div className="p-7 flex flex-row">
            <div className="p-5 flex flex-col gap-10">
                <TabComponent text="Загальне" Icon={PersonIcon} to="/mySpace/general"/>
                <TabComponent text="Ролі" Icon={PersonIcon} to="/mySpace/roles"/>
                <TabComponent text="Учасники" Icon={PersonIcon} to="/mySpace/members"/>
                <TabComponent text="Теги" Icon={PersonIcon} to="/mySpace/tags"/>
            </div>
            <Outlet />
        </div>
    );
}