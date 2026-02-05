import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSettingsFields {
    name?: EntryFieldTypes.Symbol;
    value?: EntryFieldTypes.Symbol;
}

export type TypeSettingsSkeleton = EntrySkeletonType<TypeSettingsFields, "settings">;
export type TypeSettings<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeSettingsSkeleton, Modifiers, Locales>;
export type TypeSettingsWithoutLinkResolutionResponse = TypeSettings<"WITHOUT_LINK_RESOLUTION">;
export type TypeSettingsWithoutUnresolvableLinksResponse = TypeSettings<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeSettingsWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeSettings<"WITH_ALL_LOCALES", Locales>;
export type TypeSettingsWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeSettings<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeSettingsWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeSettings<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
