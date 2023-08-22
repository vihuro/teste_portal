"use client"
import SideBar from "./sideBar/SideBar";
import TopBarSide from "./topBar/TopBar";
import { useEffect, useState } from "react";



export default function Menu() {

    const [topBarInstance, setTopBarInstace] = useState(null);
    const [sideBarInstance, setSideBarInsance] = useState(null);
    const { TopBar, toogleValue, setToogleValue } = TopBarSide();
 
    // useEffect(() => {

    //     const topBar = TopBarSide();
    //     const sideBar = SideBar();
    //     setTopBarInstace(topBar.TopBar());
    //     setSideBarInsance(sideBar);

    // }, [])





    const Page = () => {

        return (
            <>
                {/* <topBarInstance.TopBar changeToogleSideBar={sideBarInstance.setToogleSidebar} valueToogleSideBar={sideBarInstance.toogle} />
                <sideBarInstance.SideBarNavigation /> */}
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

