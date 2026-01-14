import client from "@/lib/contentful";
import MobileNavMenu from "./MobileNavMenu";

export default async function MobileNav() {
    const navLinks = await client.getEntries({
        content_type: "navigation",
        order: ["fields.order"],
    });

    const socialLinks = await client.getEntries({
        content_type: "socialLinks",
        order: ["sys.createdAt"],
    });

    return (
        <MobileNavMenu
            navLinks={JSON.parse(JSON.stringify(navLinks.items))}
            socialLinks={JSON.parse(JSON.stringify(socialLinks.items))}
        />
    );
}
