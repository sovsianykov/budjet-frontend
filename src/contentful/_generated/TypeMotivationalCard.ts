import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeMotivationalCardFields {
    title?: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
    text?: EntryFieldTypes.RichText;
}

export type TypeMotivationalCardSkeleton = EntrySkeletonType<TypeMotivationalCardFields, "motivationalCard">;
export type TypeMotivationalCard<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeMotivationalCardSkeleton, Modifiers, Locales>;
export type TypeMotivationalCardWithoutLinkResolutionResponse = TypeMotivationalCard<"WITHOUT_LINK_RESOLUTION">;
export type TypeMotivationalCardWithoutUnresolvableLinksResponse = TypeMotivationalCard<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeMotivationalCardWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeMotivationalCard<"WITH_ALL_LOCALES", Locales>;
export type TypeMotivationalCardWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeMotivationalCard<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeMotivationalCardWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeMotivationalCard<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
