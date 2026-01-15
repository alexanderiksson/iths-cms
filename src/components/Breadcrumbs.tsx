import Link from "next/link";

interface BreadcrumbsProps {
    currentPage: string;
    links: Array<{
        name: string;
        href: string;
    }>;
}

export default function Breadcrumbs({ currentPage, links }: BreadcrumbsProps) {
    return (
        <div className="flex gap-2 text-sm">
            {links.map((link, i) => (
                <div key={i} className="flex gap-2">
                    <span className="text-neutral-600">
                        <Link href={link.href}>{link.name}</Link>
                    </span>
                    <span>&gt;</span>
                </div>
            ))}

            <span>{currentPage}</span>
        </div>
    );
}
