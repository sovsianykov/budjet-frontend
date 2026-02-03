import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeWeeklySettingsFields {
    weeklyBudget?: EntryFieldTypes.Number;
    currency?: EntryFieldTypes.Symbol;
    savingTips?: EntryFieldTypes.RichText;
}

export type TypeWeeklySettingsSkeleton = EntrySkeletonType<TypeWeeklySettingsFields, "weeklySettings">;
export type TypeWeeklySettings<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeWeeklySettingsSkeleton, Modifiers, Locales>;
export type TypeWeeklySettingsWithoutLinkResolutionResponse = TypeWeeklySettings<"WITHOUT_LINK_RESOLUTION">;
export type TypeWeeklySettingsWithoutUnresolvableLinksResponse = TypeWeeklySettings<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeWeeklySettingsWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeWeeklySettings<"WITH_ALL_LOCALES", Locales>;
export type TypeWeeklySettingsWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeWeeklySettings<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeWeeklySettingsWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeWeeklySettings<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
