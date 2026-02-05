import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeArticleFields {
    title?: EntryFieldTypes.Symbol;
    content?: EntryFieldTypes.RichText;
    author?: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
    showAuthor?: EntryFieldTypes.Boolean;
}

export type TypeArticleSkeleton = EntrySkeletonType<TypeArticleFields, "article">;
export type TypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeArticleSkeleton, Modifiers, Locales>;
export type TypeArticleWithoutLinkResolutionResponse = TypeArticle<"WITHOUT_LINK_RESOLUTION">;
export type TypeArticleWithoutUnresolvableLinksResponse = TypeArticle<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeArticleWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeArticle<"WITH_ALL_LOCALES", Locales>;
export type TypeArticleWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeArticle<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeArticleWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeArticle<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
