
export const config = {
    baseApiUrl: process.env.NEXT_PUBLIC_API_URL,
    storageKey: process.env.STORAGE_KEY || "key",

    contentful: {
        spaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
        apiToken: process.env.NEXT_PUBLIC_CONTENTFUL_API_TOKEN,
        previewAccessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
        previewSecret: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_SECRET,
    },
}