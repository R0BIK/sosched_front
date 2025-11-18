import {Outlet} from "react-router-dom";
import TabComponent from "../../../components/TabComponent.jsx";

import SettingsIcon from '@mui/icons-material/Settings';
import LabelIcon from '@mui/icons-material/Label';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GppGoodIcon from '@mui/icons-material/GppGood';
import StyleIcon from '@mui/icons-material/Style';

export default function Space() {
    return (
        <div className="flex-row flex h-full overflow-hidden">
            <div className="p-5 flex h-full flex-col justify-between border-r-1 border-gray-200">
                <div className="flex flex-col gap-3">
                    <TabComponent text="Учасники" Icon={PeopleAltIcon} to="/mySpace/members" />
                    <TabComponent text="Ролі" Icon={GppGoodIcon} to="/mySpace/roles" />
                    <TabComponent text="Теги" Icon={LabelIcon} to="/mySpace/tags" />
                    <TabComponent text="Типи тегів" Icon={StyleIcon} to="/mySpace/tagTypes" />
                </div>
                <div className="mt-auto">
                    <TabComponent text="Налаштування" Icon={SettingsIcon} to="/mySpace/settings" />
                </div>
            </div>
            <div className="flex flex-col h-full w-full">
                <Outlet />
            </div>
        </div>
    );
}