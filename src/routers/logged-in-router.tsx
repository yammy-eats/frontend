import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Restaurants} from "../pages/client/restaurants";
import {NotFound} from "../pages/client/404";
import {Header} from "../components/header";
import {useMe} from "../hooks/useMe";


const ClientRoutes = [
    <Route path="/" element={<Restaurants/>}/>
];


export const LoggedInRouter = () => {
    const {data, loading, error} = useMe();
    if (!data || loading || error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="font-medium text-xl tracking-wide">Loading...</span>
            </div>
        )
    }
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                {data.me.role === "Owner" && ClientRoutes}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}