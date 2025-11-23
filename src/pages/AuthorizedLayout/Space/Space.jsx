import {Outlet} from "react-router-dom";
import TabComponent from "../../../components/TabComponent.jsx";

import GppGoodIcon from '@mui/icons-material/GppGood';

import {
    CalendarDaysSolid,
    UserMultiple4Solid,
    Bookmark1Solid,
    AirtableOutlined,
    Gear1Solid
} from "@lineiconshq/free-icons";

export default function Space() {
    return (
        <div className="flex-row flex h-full overflow-hidden">
            <div className="p-5 flex h-full flex-col justify-between border-r-1 border-gray-200">
                <div className="flex flex-col gap-3">
                    <TabComponent text="Учасники" LineIcon={UserMultiple4Solid} to="/mySpace/members" />
                    <TabComponent text="Події" LineIcon={CalendarDaysSolid} to="/mySpace/events" />
                    <TabComponent text="Ролі" Icon={GppGoodIcon} to="/mySpace/roles" />
                    <TabComponent text="Теги" LineIcon={Bookmark1Solid} to="/mySpace/tags" />
                    <TabComponent text="Типи тегів" LineIcon={AirtableOutlined} to="/mySpace/tagTypes" />
                </div>
                <div className="mt-auto">
                    <TabComponent text="Налаштування" LineIcon={Gear1Solid} to="/mySpace/settings" />
                </div>
            </div>
            <div className="flex flex-col h-full w-full">
                <Outlet />
            </div>
        </div>
    );
}