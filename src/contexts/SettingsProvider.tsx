'use client';

import { TypeSettingsWithoutUnresolvableLinksResponse } from '@/contentful/_generated';
import { getLabel as getLabelUtil } from '@/utils/getLabel';

import { createContext, useContext, useMemo } from 'react';
import createSettingsObject from "@/utils/utils";

export interface ISettings {
    [key: string]: string | ISettings;
}

interface ISettingsContext {
    contentfulSettings: ISettings;
    lang: string;
    getLabel: (keys: string[], componentSettings?: ISettings) => string;
    getList: (keys: string[]) => Array<{ key: string; value: string }>;
    getLabelsForCommonKey: (
        key: string,
        subKeys: string[],
        componentSettings?: ISettings,
    ) => {
        [key: string]: string;
    };
}

export const SettingsContext = createContext<ISettingsContext | undefined>(undefined);

interface ISettingsProvider {
    children: React.ReactNode;
    settings?: TypeSettingsWithoutUnresolvableLinksResponse[];
    lang: string;
}

export const SettingsProvider = ({ children, settings, lang }: ISettingsProvider) => {
    const contentfulSettings: ISettings = useMemo(() => createSettingsObject(settings) as ISettings, [settings]);



    const getLabel = useMemo(() => {
        return (keys: string[], componentSettings?: ISettings) => {
            return getLabelUtil(keys, componentSettings || contentfulSettings);
        };
    }, [contentfulSettings]);

    const getList = useMemo(() => {
        return (keys: string[]): Array<{ key: string; value: string }> => {
            let current: ISettings | string | undefined = contentfulSettings;

            for (const key of keys) {
                if (current && typeof current === 'object' && key in current) {
                    current = current[key];
                } else {
                    return [];
                }
            }

            if (current && typeof current === 'object') {
                return Object.entries(current)
                    .filter(([, v]) => typeof v === 'string')
                    .map(([k, v]) => ({ key: k, value: v as string }));
            }

            return [];
        };
    }, [contentfulSettings]);

    const getLabelsForCommonKey = useMemo(() => {
        return (key: string, subKeys: string[], componentSettings?: ISettings) => {
            const labels: { [key: string]: string } = {};

            subKeys.forEach((subKey) => {
                labels[subKey] = getLabel([key, subKey], componentSettings);
            });

            return labels;
        };
    }, [getLabel]);

    const contextValue = useMemo(
        () => ({
            contentfulSettings,
            lang,
            getLabel,
            getList,
            getLabelsForCommonKey,
        }),
        [contentfulSettings, lang, getLabel, getList, getLabelsForCommonKey],
    );

    return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};

export const useSettingsContext = () => {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error('useSettingsContext must be used within a SettingsProvider');
    }

    return context;
};
