import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "404 - Page not found",
};

export default function NotFound() {
    return (
        <div className="content my-auto">
            <h1 className="heading">404 - Page not found</h1>
            <div className="flex">
                <Link href="/" className="button">
                    Go back home
                </Link>
            </div>
        </div>
    );
}
