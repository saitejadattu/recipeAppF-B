import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Cookies from "js-cookie"
const ProtechtedRoute = () => {
    const jwtToken = Cookies.get("jwtToken")
    return (
        jwtToken !== undefined ? <Outlet /> : <Navigate to="/" />
    )
}

export default ProtechtedRoute
