import {Box} from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import {CreateTransactionForm} from "@/components/Forms/CreateTransactionForm";
import {useProducts} from "@/hooks/useProducts";

export default function CreateTransactionPage() {



    return (
        <Box display="flex" color='gray' bgcolor='white' sx={{ maxWidth: 400, marginX: "auto" }}>
            <Sidebar/>
            <div>
                <CreateTransactionForm />
            </div>
        </Box>
    )
}