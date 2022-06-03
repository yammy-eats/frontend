import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Restaurants} from "../pages/client/restaurants";
import {NotFound} from "../pages/404";
import {Header} from "../components/header";
import {useMe} from "../hooks/useMe";
import {ConfirmEmail} from "../pages/user/confirm-email";


const ClientRoutes = [
    <Route key={1} path="/" element={<Restaurants/>}/>,
    <Route key={2} path="/confirm" element={<ConfirmEmail/>}/>
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