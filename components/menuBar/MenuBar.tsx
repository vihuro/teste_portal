"use client"
import SideBar from "./sideBar/SideBar";
import TopBarSide from "./topBar/TopBar";
import { useEffect, useState } from "react";



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

