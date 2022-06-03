import React from "react"
import {Link} from "react-router-dom";

export const NotFound = () => (
    <div className="h-screen flex flex-col items-center justify-center">
        <h2 className="font-semibold text-2xl mb-3">페이지를 찾을 수 없습니다.</h2>
        <Link to="/" className="font-bold text-lime-600 hover:underline">Go back home &rarr;</Link>
    </div>
)
