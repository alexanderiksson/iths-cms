import client from "./contentful";

export default async function fetchPage(slug: string) {
    const pageContent = await client.getEntries({
        content_type: "pages",
        "fields.slug": slug,
        limit: 1,
    });

    return pageContent.items[0];
}
