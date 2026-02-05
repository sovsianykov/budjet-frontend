"use client";

import { useState } from "react";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import RedeemIcon from '@mui/icons-material/Redeem';
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import Link from "next/link";

const drawerWidth = 240;

export default function Sidebar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace("/login");
    };

    const drawerContent = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", color: "white", backgroundColor: "#1976D2" , height: "100vh"}}>
            <Toolbar />
            <List>
                <Link href={'/dashboard'}>
                <ListItemButton>
                    <ListItemIcon>
                        <HomeIcon className="text-white"/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                </Link>

                <Link href={'/products'}>
                    <ListItemButton>
                        <ListItemIcon>
                            <RedeemIcon  className="text-white"/>
                        </ListItemIcon>
                        <ListItemText primary="Products" />
                    </ListItemButton>
                </Link>

                <Link href={'/transactions'}>
                    <ListItemButton>
                        <ListItemIcon>
                            <RequestQuoteIcon className="text-white"/>
                        </ListItemIcon>
                        <ListItemText primary="Transactions" />
                    </ListItemButton>
                </Link>

                <Link href={'/profile'}>
                <ListItemButton>
                    <ListItemIcon>
                        <AccountCircleIcon  className="text-white"/>
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                </Link>
                <Box sx={{ mt: "auto" }}>
                    <List>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon  className="text-white"/>
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </List>
                </Box>
            </List>
        </Box>
    );

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                className='absolute! top-0 left-0 z-10 '
                onClick={handleDrawerToggle}
                sx={{ m: 1, display: { sm: "none" } }}
            >
                <MenuIcon className='text-purple-900' />
            </IconButton>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </>
    );
}
