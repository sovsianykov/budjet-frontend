"use client"

import {Box, Typography} from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import {useProducts} from "@/hooks/useProducts";


export default function ProductsPage() {

    const { products, loading, error, reload } = useProducts();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>❌ {error}</p>;

      return   <Box display="flex" color='gray' bgcolor='white'>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Typography variant="h4">Products</Typography>
              <Typography mt={2} ml={5}>
                  Products.
              </Typography>
          </Box>
      </Box>
    }