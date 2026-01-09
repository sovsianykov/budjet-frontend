"use client";

import { useState } from "react";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";

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
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", color: "white", backgroundColor: "purple" , height: "100vh"}}>
            <Toolbar />
            <List>
                <ListItemButton>
                    <ListItemIcon>
                        <HomeIcon className="text-white"/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <AccountCircleIcon  className="text-white"/>
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
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
            {/* Кнопка для мобильного меню */}
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ m: 1, display: { sm: "none" } }}
            >
                <MenuIcon className='text-purple-900' />
            </IconButton>

            {/* Мобильный Drawer */}
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
