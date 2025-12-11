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
import {useState} from "react";
import {useLockBodyScroll} from "../../../../hooks/useLockBodyScroll.js";
import EditSpaceModal from "../../../components/Modals/EditSpaceModal.jsx";

export default function Space() {
    const [isModalVisible, setModalVisible] = useState(false);

    const onClick = () => {
        setModalVisible(true);
    }

    const handleClose = () => {
        setModalVisible(false);
    }

    useLockBodyScroll(isModalVisible);

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
                    <TabComponent text="Налаштування" LineIcon={Gear1Solid} onClick={onClick} />
                </div>
            </div>
            <div className="flex flex-col h-full w-full">
                <Outlet />
            </div>

            {isModalVisible && (
                <EditSpaceModal handleClose={handleClose} />
            )}
        </div>
    );
}

/**
 * Асинхронно копирует предоставленный текст в буфер обмена.
 * @param {string} textToCopy - Текст, который нужно скопировать.
 * @returns {Promise<void>}
 */
async function copyToClipboard(textToCopy) {
    if (!textToCopy) {
        // console.warn("Attempted to copy empty text.");
        return;
    }

    await navigator.clipboard.writeText(textToCopy);
    // console.log('Текст скопирован в буфер обмена (Navigator API):', textToCopy);
}