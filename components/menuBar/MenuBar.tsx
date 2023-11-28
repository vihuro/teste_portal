"use client"
import SideBar from "./sideBar/SideBar";
import { TopBar, Actions } from "./topBar/TopBar";



function Menu({ idList }: { idList?: number }) {

    return (
        <>
            <TopBar />
            <SideBar idList={idList} />
        </>
    )
}

export {
    Menu,
    Actions
}



