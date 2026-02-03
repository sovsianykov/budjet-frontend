"use client"

import {Box} from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import {useAuth} from "@/hooks/useAuth";
import {useEffect} from "react";


export default function ProfilePage() {

    const { me, user, tokens } = useAuth()

    useEffect(() => {

        me()

    }, [me, tokens]);
    console.log('user ',user)
    return (
        <Box display="flex" color='gray' bgcolor='white'>
            <Sidebar/>
            Profile
        </Box>
    )

}