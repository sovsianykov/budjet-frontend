import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSeoMetadataFields {
    metaTitle?: EntryFieldTypes.Symbol;
    metaDescription?: EntryFieldTypes.Symbol;
    ogTitle?: EntryFieldTypes.Symbol;
    ogDescription?: EntryFieldTypes.Symbol;
    ogImage?: EntryFieldTypes.AssetLink;
    noIndex?: EntryFieldTypes.Boolean;
    canonicalUrl?: EntryFieldTypes.Symbol;
}

export type TypeSeoMetadataSkeleton = EntrySkeletonType<TypeSeoMetadataFields, "seoMetadata">;
export type TypeSeoMetadata<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeSeoMetadataSkeleton, Modifiers, Locales>;
export type TypeSeoMetadataWithoutLinkResolutionResponse = TypeSeoMetadata<"WITHOUT_LINK_RESOLUTION">;
export type TypeSeoMetadataWithoutUnresolvableLinksResponse = TypeSeoMetadata<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeSeoMetadataWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeSeoMetadata<"WITH_ALL_LOCALES", Locales>;
export type TypeSeoMetadataWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeSeoMetadata<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeSeoMetadataWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeSeoMetadata<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
