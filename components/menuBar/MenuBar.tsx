"use client"
import { useEffect } from "react";
import SideBar from "./sideBar/SideBar";
import TopBar from "./topBar/TopBar";
import TopBarSide from "./topBar/TopBar";



export default function Menu() {
    const { TopBar, toogleValue, setToogleValue } = TopBarSide();



    const Page = () => {
        return (
            <>
                <TopBar />
                <SideBar />
            </>
        )
    }
    return {
        Page,

        toogleValue,
        setToogleValue

    }

}

