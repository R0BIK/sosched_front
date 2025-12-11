import {useInfiniteScroll} from "./InfinityScroll/useInfiniteScroll.js";
import {useGetTags} from "../../tanStackQueries/tag/useGetTags.js";
import {useSpace} from "../../context/Space/useSpace.js";
import Badge from "../components/Badges/Badge.jsx";
import PropTypes from "prop-types";

export default function TagsColumn({ tagTypeId, selectedTags, onToggle }) {
    const { activeSpace } = useSpace();
    const domain = activeSpace?.domain;
    const filterObj = { tagType: tagTypeId };

    const tagQuery = useGetTags(domain, filterObj);

    const tags = tagQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const totalCount = tagQuery.data?.pages?.[0]?.totalCount ?? 0;

    const loadMoreRef = useInfiniteScroll(tagQuery);

    return (
        <div className="w-full flex flex-col gap-4">
            {tags?.map((tag) => {
                const isChecked = selectedTags?.includes(tag.shortName);

                return (
                    <div key={tag.id} className="flex justify-between items-center" onClick={() => onToggle(tag.shortName)}>
                        <Badge text={tag.shortName} color={tag.color} />
                        <input
                            // name={name}
                            type="checkbox"
                            checked={isChecked}
                            readOnly
                            className="h-4 w-4 rounded-md border-gray-300 text-accent focus:ring-accent cursor-pointer"
                        />
                    </div>
            )})}
        </div>
    )
}

TagsColumn.propTypes = {
    tagTypeId: PropTypes.number,
    selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    onToggle: PropTypes.func,
}