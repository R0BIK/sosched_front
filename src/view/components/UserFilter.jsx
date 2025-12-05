import {useGetTagTypes} from "../../tanStackQueries/tagType/useGetTagTypes.js";
import {useInfiniteScroll} from "./InfinityScroll/useInfiniteScroll.js";
import {useSpace} from "../../context/SpaceContext.jsx";
import TagsColumn from "./TagsColumn.jsx";
import {useState} from "react";
import PropTypes from "prop-types";

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
        <div className="w-full h-full flex flex-col gap-6 overflow-y-auto p-4">
            {tagTypes?.map((type) => (
                <div key={type.id} className="flex flex-col">
                    <p className="mb-2">
                        {type?.name}
                    </p>
                    <TagsColumn tagTypeId={type.id} selectedTags={selectedTags} onToggle={handleToggleTag} />
                </div>
            ))}
        </div>
    )
}

UserFilter.propTypes = {
    onChange: PropTypes.func,
}