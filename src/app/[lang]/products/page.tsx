"use client"
import {ProductTable} from "@/components/ProductsTable/ProductsTable";
import {useProducts} from "@/hooks/useProducts";
import { CircularProgress } from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import { redirect } from "next/navigation";
import styles from  './products.module.scss'

export default function ProductsPage() {

    const {products, loading, error} = useProducts();

    if (error) redirect("/error");

    if (loading) return <div><CircularProgress/></div>;

    return (
        <main className={styles.fullscreenBg}>
           <Sidebar/>
            {/*<Typography component="h1" color="primary" variant="h5" className='px-3 pb-6'>Products</Typography>*/}
            <ProductTable products={products}/>
        </main>
    );
}
