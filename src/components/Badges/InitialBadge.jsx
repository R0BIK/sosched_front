import PropTypes from "prop-types";
import clsx from "clsx";

export default function InitialBadge({ text }) {
    return (
        <span
            className="flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium
            group-data-active:border-accent
            group-data-active:text-accent
            border-gray-200 text-gray-400 group-hover:border-accent group-hover:text-accent"
        >
      {text}
    </span>
    );
}

InitialBadge.propTypes = {
    text: PropTypes.string.isRequired,
};