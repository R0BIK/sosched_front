import PropTypes from "prop-types";

export default function BasicButton({text, onClick, color="accent", size="sm"}) {
    return (
        <div className="flex items-start">
            <button
                data-color-accent={ color === "accent" ? "" : undefined }
                data-color-red={ color === "red" ? "" : undefined }
                data-color-green={ color === "green" ? "" : undefined }

                data-size-sm={ size === "sm" ? "" : undefined }
                data-size-xl={ size === "xl" ? "" : undefined }

                type="button"
                onClick={onClick}
                className="block whitespace-nowrap rounded-md text-text-white font-semibold  shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2
                text-center
                bg-accent hover:bg-accent-on-hover focus-visible:outline-accent
                data-color-red:bg-red data-color-red:hover:bg-red-on-hover data-color-red:focus-visible:outline-red
                data-color-green:bg-green data-color-green:hover:bg-green-on-hover data-color-green:focus-visible:outline-green
                text-sm px-3 py-2
                data-size-xl:text-xl data-size-xl:px-6 data-size-xl:py-3
                "
            >
                {text}
            </button>
        </div>
    )
}

BasicButton.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    onClick: PropTypes.func,
}