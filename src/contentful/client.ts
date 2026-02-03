import * as contentful from 'contentful';
// import { draftMode } from 'next/headers';
import { config } from "@/config/config";

export const client = contentful.createClient({
    space: config.contentful.spaceId ?? '',
    accessToken: config.contentful.accessToken ?? '',
    environment: config.contentful.environment ?? '',
});

export const previewClient = contentful.createClient({
    host: 'preview.contentful.com',
    space: config.contentful.spaceId ?? '',
    environment: config.contentful.environment ?? '',
    accessToken: config.contentful.previewAccessToken ?? '',
});

export const getContentfulClient = (isEnabledDraftMode: boolean = false) => {
    return isEnabledDraftMode ? previewClient : client;
};
