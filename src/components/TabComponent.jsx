import PropTypes from "prop-types";

export default function TabComponent({ text, Icon }) {
    return (
        <button
            className="flex items-center justify-between gap-4 my-6 rounded-xl p-4 w-[220px]
            hover:border">
            <div className="flex justify-center">
                {Icon && <Icon className="size-6 fill-main-black" />}
            </div>

            <p className="font-noto text-main-black font-semibold text-xl text-left flex-1">
                {text}
            </p>
        </button>
    )
}

TabComponent.propTypes = {
    text: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
}