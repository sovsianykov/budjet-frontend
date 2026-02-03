import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCategorySkeleton } from "./TypeCategory";

export interface TypeExpenseTemplateFields {
    title?: EntryFieldTypes.Symbol;
    defaultAmount?: EntryFieldTypes.Number;
    category?: EntryFieldTypes.EntryLink<TypeCategorySkeleton>;
    recurring?: EntryFieldTypes.Boolean;
}

export type TypeExpenseTemplateSkeleton = EntrySkeletonType<TypeExpenseTemplateFields, "expenseTemplate">;
export type TypeExpenseTemplate<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeExpenseTemplateSkeleton, Modifiers, Locales>;
export type TypeExpenseTemplateWithoutLinkResolutionResponse = TypeExpenseTemplate<"WITHOUT_LINK_RESOLUTION">;
export type TypeExpenseTemplateWithoutUnresolvableLinksResponse = TypeExpenseTemplate<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeExpenseTemplateWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeExpenseTemplate<"WITH_ALL_LOCALES", Locales>;
export type TypeExpenseTemplateWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeExpenseTemplate<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeExpenseTemplateWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeExpenseTemplate<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
