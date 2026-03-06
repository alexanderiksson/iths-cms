import Link from "next/link";
import client from "../lib/contentful";
import { Entry } from "contentful";
import ThemeToggle from "./ThemeToggle";

export default async function Navbar() {
    const navLinks = await client.getEntries({
        content_type: "navigation",
        order: ["fields.order"],
    });

    return (
        <aside className="hidden fixed left-0 top-0 bottom-0 w-56 lg:flex flex-col justify-between gap-8 py-8 px-12">
            <Link
                href="/"
                className="inline-flex items-center font-medium text-2xl"
            >
                Alex
            </Link>

            <nav>
                <ul className="flex flex-col gap-1 text-2xl">
                    {navLinks.items.map((link, i) => {
                        const name = link.fields.name as string;
                        const page = link.fields.page as Entry;
                        const slug = page.fields.slug as string;

                        return (
                            <li key={i}>
                                <Link href={"/" + slug}>{name}</Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <ThemeToggle />
        </aside>
    );
}
