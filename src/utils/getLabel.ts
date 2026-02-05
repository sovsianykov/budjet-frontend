import { NO_LABEL_IN_THE_CONTENTFUL } from '@/constants/constants';

interface ISettings {
    [key: string]: string | ISettings;
}

export const getLabel = (keys: string[], componentSettings?: ISettings) => {
    let current: ISettings | string | undefined = componentSettings;

    for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
            current = current[key];
        } else {
            return `${NO_LABEL_IN_THE_CONTENTFUL} - ${keys.join('.')}`;
        }
    }

    return typeof current === 'string'
        ? current
        : `${NO_LABEL_IN_THE_CONTENTFUL} - ${keys.join('.')}`;
};
