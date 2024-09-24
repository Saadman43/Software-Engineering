import React, { useState } from 'react'
import useUser from '../hooks/useUser'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export const Profile = () => {
    const navigate = useNavigate()
    const user = useUser()
    if (user) {
        return (
            <div>
                <h1>Profile</h1>
                <p>Username: {user.sub}</p>
                <p>first name: {user.firstname}</p>
                <p>last name: {user.lastname}</p>
                <p>Active Status: {user.is_active && "True"}</p>
                <button onClick={() => {
                    localStorage.removeItem('accessToken')
                    navigate('/login')
                }
                }>Logout</button>
            </div>
        )
    }else{
        <Navigate to="/login"></Navigate>
    }
}
