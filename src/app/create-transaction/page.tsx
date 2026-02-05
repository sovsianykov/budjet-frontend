import {Box} from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import {CreateTransactionForm} from "@/components/Forms/CreateTransactionForm";
import {Product} from "@/types/types";

export default function CreateTransactionPage() {
    const mockProducts: Product[] = [
        { id: "1", productName: "Apple", price: 1.5, createdAt: new Date(), updatedAt: new Date() },
        { id: "2", productName: "Orange", price: 2, createdAt: new Date(), updatedAt: new Date() },
    ];


    return (
        <Box display="flex" color='gray' bgcolor='white'>
            <Sidebar/>
            <div>
                <CreateTransactionForm products={mockProducts}/>
            </div>
        </Box>
    )
}