import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router";
export default function RootPage(){
    return(
        <div className="flex">
        <Sidebar/>   
        <Outlet/>
        </div>   

    )
}