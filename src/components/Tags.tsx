interface TagProps {
    tags: Array<string>;
}

export default function Tags({ tags }: TagProps) {
    return (
        <div className="flex items-center flex-wrap gap-y-4 gap-x-2">
            {tags.map((tag, i) => (
                <span
                    key={i}
                    className="bg-white py-1 px-3 rounded-full text-sm"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
}
