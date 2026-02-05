import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSimplePageLayoutFields {
    title?: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    seoMetadata?: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
    settings?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
    seoMyMetadata?: EntryFieldTypes.EntryLink<EntrySkeletonType>;
}

export type TypeSimplePageLayoutSkeleton = EntrySkeletonType<TypeSimplePageLayoutFields, "simplePageLayout">;
export type TypeSimplePageLayout<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeSimplePageLayoutSkeleton, Modifiers, Locales>;
export type TypeSimplePageLayoutWithoutLinkResolutionResponse = TypeSimplePageLayout<"WITHOUT_LINK_RESOLUTION">;
export type TypeSimplePageLayoutWithoutUnresolvableLinksResponse = TypeSimplePageLayout<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeSimplePageLayoutWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeSimplePageLayout<"WITH_ALL_LOCALES", Locales>;
export type TypeSimplePageLayoutWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeSimplePageLayout<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeSimplePageLayoutWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeSimplePageLayout<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
