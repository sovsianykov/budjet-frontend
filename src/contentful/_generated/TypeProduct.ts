import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeProductFields {
    productName?: EntryFieldTypes.Symbol;
    price?: EntryFieldTypes.Number;
    createdAt?: EntryFieldTypes.Date;
    uptatedAt?: EntryFieldTypes.Date;
}

export type TypeProductSkeleton = EntrySkeletonType<TypeProductFields, "product">;
export type TypeProduct<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeProductSkeleton, Modifiers, Locales>;
export type TypeProductWithoutLinkResolutionResponse = TypeProduct<"WITHOUT_LINK_RESOLUTION">;
export type TypeProductWithoutUnresolvableLinksResponse = TypeProduct<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeProductWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeProduct<"WITH_ALL_LOCALES", Locales>;
export type TypeProductWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeProduct<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeProductWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeProduct<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
