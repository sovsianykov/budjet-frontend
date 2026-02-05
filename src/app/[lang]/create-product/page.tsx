import {Box} from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import CreateProductForm from "@/components/Forms/CreateProductForm/CreateProductForm";
import ProductsList from "@/components/ProductsList/ProductsList";


export default async function createProduct() {



    return (
        <Box display="flex" color='gray' bgcolor='white' justifyContent='center'>
            <Sidebar/>
            <Box className="w-full">
                <CreateProductForm />
                <ProductsList />
            </Box>
        </Box>
    )
}