import React from "react";
import {gql, useQuery} from "@apollo/client";
import {meQuery} from "../__generated__/meQuery";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {Restaurants} from "../pages/client/restaurants";
import {NotFound} from "../pages/client/404";


const ClientRoutes = [
        <Route path="/" element={<Restaurants/>}/>
];

const ME_QUERY = gql`
    query meQuery {
        me {
            id
            email
            role
            verified
        }
    }
`

export const LoggedInRouter = () => {
    const {data, loading, error} = useQuery<meQuery>(ME_QUERY)
    console.log(data)
    if (!data || loading || error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="font-medium text-xl tracking-wide">Loading...</span>
            </div>
        )
    }
    return (
        <BrowserRouter>
            <Routes>
                {data.me.role === "Client" && ClientRoutes}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}