import { createClient } from "contentful";

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_AUTH_TOKEN;

if (!spaceId || !accessToken) {
    throw new Error("env is missing");
}

const client = createClient({
    space: spaceId,
    accessToken: accessToken,
});

export default client;
