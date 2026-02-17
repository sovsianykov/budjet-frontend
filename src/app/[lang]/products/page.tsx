"use client"
import {ProductTable} from "@/components/ProductsTable/ProductsTable";
import {useProducts} from "@/hooks/useProducts";
import { CircularProgress, Typography} from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import { redirect } from "next/navigation";

export default function ProductsPage() {

    const {products, loading, error} = useProducts();

    if (error) redirect("/error");

    if (loading) return <div><CircularProgress/></div>;

    return (
        <main className="mt-[120px]  xlg:mt-[182px] xl:mt-[160px]">
           <Sidebar/>
            <Typography component="h1" variant="h5" className='px-3 pb-6'>Products</Typography>
            <ProductTable products={products}/>
        </main>
    );
}
