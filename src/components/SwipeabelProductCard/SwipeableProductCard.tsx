"use client";

import { Card, CardContent, Typography, Box } from "@mui/material";
import {
    motion,
    useMotionValue,
    useTransform,
    animate,
} from "framer-motion";
import { useState } from "react";
import { Product } from "@/types/types";

type Props = {
    product: Product;
    onDelete: (id: string) => void;
    onAddToCart: (id: string) => void;
};

const OPEN_OFFSET = 140;
const DISMISS_OFFSET = 260;
const THRESHOLD = 70;

export default function SwipeableProductCard({
                                                 product,
                                                 onDelete,
                                                 onAddToCart,
                                             }: Props) {
    const x = useMotionValue(0);
    const [isGone, setIsGone] = useState(false);

    const bgColor = useTransform(
        x,
        [-OPEN_OFFSET, 0, OPEN_OFFSET],
        ["#1976D2", "#ffffff", "#d32f2f"]
    );

    const snap = (to: number) =>
        animate(x, to, { type: "spring", stiffness: 300, damping: 30 });

    const handleDragEnd = (_: any, info: any) => {
        const offset = info.offset.x;

        if (!product.id) return;

        // 🔥 FULL DISMISS
        if (offset > DISMISS_OFFSET) {
            animate(x, 600, { duration: 0.2 }).then(() => {
                setIsGone(true);
                onDelete(product.id);
            });
            return;
        }

        if (offset < -DISMISS_OFFSET) {
            animate(x, -600, { duration: 0.2 }).then(() => {
                setIsGone(true);
                onAddToCart(product.id);
            });
            return;
        }

        // 👉 OPEN ACTION
        if (offset > THRESHOLD) {
            snap(OPEN_OFFSET);
        } else if (offset < -THRESHOLD) {
            snap(-OPEN_OFFSET);
        } else {
            snap(0);
        }
    };

    if (isGone) return null;

    return (
        <Box sx={{ position: "relative", height: 80, mb: 2, overflow: "hidden" }}>
            {/* Dynamic background */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 20px",
                    color: "#fff",
                    fontWeight: 600,
                }}
            >

            </motion.div>

            {/* Card */}
            <motion.div
                drag="x"
                style={{
                    x,
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    zIndex: 2,
                    touchAction: "pan-y",
                }}
                dragElastic={0.15}
                dragConstraints={{ left: -DISMISS_OFFSET, right: DISMISS_OFFSET }}
                onDragEnd={handleDragEnd}
            >
                <Card sx={{  height: "100%", boxShadow: "xl",  border: "2px 5px 10px black", }} className='shadow-xl'>
                    <CardContent
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "100%",


                        }}
                    >
                        <Typography fontWeight={500}>
                            {product.productName}
                        </Typography>

                        <Typography variant="h6" fontWeight={700} color="primary">
                            ${product.price}
                        </Typography>
                    </CardContent>
                </Card>
            </motion.div>
        </Box>
    );
}
