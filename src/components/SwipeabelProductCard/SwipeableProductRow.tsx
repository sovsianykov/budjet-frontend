"use client";

import {Card, CardContent, Typography, Box} from "@mui/material";
import {motion, useMotionValue, useTransform, animate, PanInfo} from "framer-motion";
import {useState} from "react";
import {Product} from "@/types/types";

type Props = {
    product: Product;
    onDeleteAction: (id: string) => void;
    onAddToCartAction: (id: string) => void;
};

// 👉 UX tuning constants
const OPEN_OFFSET = 120;
const DISMISS_OFFSET = 10;
const THRESHOLD = 30;
const VELOCITY_TRIGGER = 600;
const EXIT_DISTANCE = 600;

export default function SwipeableProductRow({
                                                product,
                                                onDeleteAction,
                                                onAddToCartAction,
                                            }: Props) {
    const x = useMotionValue(0);
    const [isGone, setIsGone] = useState(false);

    const bgColor = useTransform(
        x,
        [-OPEN_OFFSET, 0, OPEN_OFFSET],
        ["#1976D2", "#ffffff", "#d32f2f"]
    );

    const snap = (to: number) =>
        animate(x, to, {
            type: "spring",
            stiffness: 400,
            damping: 35,
        });

    const dismiss = (direction: "left" | "right") => {
        const exitX = direction === "right" ? EXIT_DISTANCE : -EXIT_DISTANCE;

        animate(x, exitX, {
            duration: 0.18,
            ease: "easeOut",
        }).then(() => {
            setIsGone(true);

            if (!product.id) return;

            if (direction === "right") onDeleteAction(product.id);
            else onAddToCartAction(product.id);
        });
    };

    const handleDragEnd = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        if (!product.id) return;

        const offset = info.offset.x;
        const velocity = info.velocity.x;

        const isSwipeRight = offset > 0;
        const isSwipeLeft = offset < 0;

        // 🔥 FAST SWIPE (momentum swipe)
        if (velocity > VELOCITY_TRIGGER) {
            dismiss("right");
            return;
        }

        if (velocity < -VELOCITY_TRIGGER) {
            dismiss("left");
            return;
        }

        // 🔥 LONG SWIPE
        if (offset > DISMISS_OFFSET) {
            dismiss("right");
            return;
        }

        if (offset < -DISMISS_OFFSET) {
            dismiss("left");
            return;
        }

        // 👉 OPEN ACTION STATE
        if (isSwipeRight && offset > THRESHOLD) {
            snap(OPEN_OFFSET);
        } else if (isSwipeLeft && offset < -THRESHOLD) {
            snap(-OPEN_OFFSET);
        } else {
            snap(0);
        }
    };

    if (isGone) return null;

    return (
        <Box
            sx={{
                position: "relative",
                height: 60,
                mb: 1,
                overflow: "hidden",
                borderRadius: 2,
                boxShadow: 6
            }}
        >
            {/* Background */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: bgColor,
                }}
            />

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
                dragElastic={0.25}
                dragMomentum={true}
                dragConstraints={{left: -400, right: 400}}
                onDragEnd={handleDragEnd}
            >
                <Card
                    sx={{
                        height: "100%",
                        boxShadow: 3,
                        borderRadius: 2,
                    }}
                >
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
                            ₴{product.price}
                        </Typography>
                    </CardContent>
                </Card>
            </motion.div>
        </Box>
    );
}