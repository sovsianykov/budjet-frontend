
"use client";

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Product } from "@/types/types";

type ProductTableProps = {
    products: Product[];
};


const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    borderRadius: 12,
    boxShadow: theme.shadows[3],
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.grey[900],
    background: `linear-gradient(135deg, ${theme.palette.grey[100]}, ${theme.palette.grey[200]})`,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
        backgroundColor: theme.palette.action.selected,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));



export const ProductTable = ({ products }: ProductTableProps) => {


    if (!products.length) {
        return (
            <Paper sx={{ p: 3, borderRadius: 2 , maxWidth: 800, marginX: "auto"}}>
                <Typography align="center" color="text.secondary">
                    No products available
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper
            sx={{
                borderRadius: 2,
                boxShadow: 3,
                width: { md: 800, xs: "100%" },
                mx: "auto",
            }}

        >
        <StyledTableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableHeadCell>Product</StyledTableHeadCell>
                        <StyledTableHeadCell>Price</StyledTableHeadCell>
                        <StyledTableHeadCell>Created</StyledTableHeadCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {products.map((product) => (
                        <StyledTableRow key={product.id}>
                            <TableCell>{product.productName}</TableCell>

                            <TableCell>
                                ₴{product.price.toFixed(2)}
                            </TableCell>

                            <TableCell>
                                {product.createdAt
                                    ? new Date(product.createdAt).toLocaleDateString()
                                    : "—"}
                            </TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
            </Paper>
    );
};
