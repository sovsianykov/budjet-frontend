import {client} from "@/contentful/client";
import {TypeSettingsSkeleton, TypeSettingsWithoutUnresolvableLinksResponse} from "@/contentful/_generated";

export const loadSettings = async (): Promise<TypeSettingsWithoutUnresolvableLinksResponse[]> => {
    const response = await client.getEntries<TypeSettingsSkeleton>({
        content_type: 'settings',
        limit: 1000,
    });

    return response.items;
};
