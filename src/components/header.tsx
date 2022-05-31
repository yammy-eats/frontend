import React from "react"
import nuberLogo from "../images/logo.svg"
import {useMe} from "../hooks/useMe";
import {UserNinja} from '@styled-icons/fa-solid/UserNinja'
import {Link} from "react-router-dom";

export const Header: React.FC = () => {
    const {data} = useMe()
    return (
        <header className="py-4">
            <div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
                <img src={nuberLogo} className="w-28"/>
                <span className="text-xs">
                    <Link to="/my-profile">
                    <UserNinja size="30" title="user" />
                        </Link>
                </span>
            </div>
        </header>
    )
}