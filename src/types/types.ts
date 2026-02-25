export interface Order {
    id: string;
    productName: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    userId: string;
  }

export type Product  = {
    id        : string;
    productName : string;
    price       : number;
    createdAt?  : Date;
    updatedAt?   : Date;
}

export interface TransactionItemInput {
    productId: string;
    quantity: number;
}

export interface CreateTransactionInput {
    userId: string;
    items: TransactionItemInput[];
}

export interface TransactionItem {
    id: string;
    productId: string;
    quantity: number;
    product: {
        id: string;
        productName: string;
        price: number;
    };
}

export interface Transaction {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    items: TransactionItem[];
}

export interface PageParamsWithLang<T = {}> {
    params: {
        lang: string;
    } & T;
    searchParams: {
        [key: string]: string;
    };
}
export interface PageParamsWithSlug {
    params: {
        slug: string;
    };
    searchParams: {
        [key: string]: string;
    };
}