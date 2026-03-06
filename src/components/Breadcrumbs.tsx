import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
    currentPage: string;
    links: Array<{
        name: string;
        href: string;
    }>;
}

export default function Breadcrumbs({ currentPage, links }: BreadcrumbsProps) {
    return (
        <div className="flex gap-2 sm:text-sm">
            {links.map((link, i) => (
                <div key={i} className="flex items-center gap-2">
                    <span className="opacity-50">
                        <Link href={link.href}>{link.name}</Link>
                    </span>
                    <ChevronRight size={14} className="opacity-50" />
                </div>
            ))}

            <span>{currentPage}</span>
        </div>
    );
}
