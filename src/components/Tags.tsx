interface TagProps {
    tags: Array<string>;
    className?: string;
}

export default function Tags({ tags, className = "bg-(--text)/10 border border-(--text)/15 text-(--text) backdrop-blur-lg" }: TagProps) {
    return (
        <div className="flex items-center flex-wrap gap-2">
            {tags.map((tag, i) => (
                <span
                    key={i}
                    className={`font-medium text-xs px-3 py-1.5 rounded-full tracking-wide ${className}`}
                >
                    {tag}
                </span>
            ))}
        </div>
    );
}
