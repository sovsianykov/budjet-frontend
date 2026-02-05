export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'Something went wrong';
}

import { TypeSettingsWithoutUnresolvableLinksResponse } from '@/contentful/_generated';

type TSettings = {
    [key: string]: string | TSettings | undefined;
};

/**
 * Creates a settings object from an array of settings entries.
 * @param settings - An optional array of settings entries.
 * @returns The settings object.
 */
const createSettingsObject = (settings?: TypeSettingsWithoutUnresolvableLinksResponse[]) => {
    if (!settings) return {};
    return settings.reduce((result: TSettings, setting) => {
        if (setting?.fields?.name && setting.fields.value) {
            const keyParts = setting.fields.name.split('.');

            keyParts.reduce((current, key, index) => {
                if (index === keyParts.length - 1) {
                    current[key] = setting.fields.value;
                } else {
                    if (!current[key]) {
                        current[key] = {};
                    }
                    return current[key] as TSettings;
                }
                return current;
            }, result);
        }
        return result;
    }, {} as TSettings);
};

export default createSettingsObject;
