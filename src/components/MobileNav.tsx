import client from "@/lib/contentful";
import MobileNavMenu from "./MobileNavMenu";

export default async function MobileNav() {
    const navLinks = await client.getEntries({
        content_type: "navigation",
        order: ["fields.order"],
    });

    return (
        <MobileNavMenu navLinks={JSON.parse(JSON.stringify(navLinks.items))} />
    );
}
