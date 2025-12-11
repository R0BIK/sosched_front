import {useGetTagTypes} from "../../tanStackQueries/tagType/useGetTagTypes.js";
import {useInfiniteScroll} from "./InfinityScroll/useInfiniteScroll.js";
import {useSpace} from "../../context/Space/useSpace.js";
import TagsColumn from "./TagsColumn.jsx";
import {useState} from "react";
import PropTypes from "prop-types";
import InfiniteScrollTrigger from "./InfinityScroll/InfiniteScrollTrigger.jsx";

export default function UserFilter({ onChange }) {
    const { activeSpace } = useSpace();
    const domain = activeSpace?.domain;

    const [selectedTags, setSelectedTags] = useState([]);

    const tagTypesQuery = useGetTagTypes(domain);

    const tagTypes = tagTypesQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const totalCount = tagTypesQuery.data?.pages?.[0]?.totalCount ?? 0;

    const loadMoreRef = useInfiniteScroll(tagTypesQuery);

    const handleToggleTag = (tagShortName) => {
        let newTags;
        if (selectedTags.includes(tagShortName)) {
            newTags = selectedTags.filter((t) => t !== tagShortName);
        } else {
            newTags = [...selectedTags, tagShortName];
        }

        setSelectedTags(newTags);

        if (newTags.length > 0) {
            onChange({ tag: newTags });
        } else {
            onChange({ tag: undefined });
        }
    };

    return (
        <div className="w-full h-full flex flex-col overflow-y-auto px-4">
            <div className="flex flex-col w-full divide-y divide-gray-200">
                {tagTypes?.map((type) => (
                    <div key={type.id} className="flex flex-col pb-4 py-2">
                        <p className="mb-2">
                            {type?.name}
                        </p>
                        <TagsColumn tagTypeId={type.id} selectedTags={selectedTags} onToggle={handleToggleTag} />
                    </div>
                ))}
            </div>
            <InfiniteScrollTrigger
                ref={loadMoreRef}
                isFetching={tagTypesQuery.isFetchingNextPage}
            />
        </div>
    )
}

UserFilter.propTypes = {
    onChange: PropTypes.func,
}