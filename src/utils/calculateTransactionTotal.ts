import {TransactionItem} from "@/types/types";

export const calculateTransactionTotal = (items: TransactionItem[]) =>
    items.reduce(
        (total, item) => total + item.product.price * Number(item.quantity),
        0
    );
