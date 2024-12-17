import React, { useState } from 'react'
import useUser from '../hooks/useUser'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export const Profile = () => {
    const navigate = useNavigate()
    const user = useUser()
    if (user) {
        return (
            <div className='container mt-4'>
                <h1>Profile</h1>
                <p>Username: {user.sub}</p>
                <p>Name: {user.name}</p>
                <p>Phone: {user.mobile_number}</p>
                <p>Active Status: {user.is_active && "True"}</p>
            </div>
        )
    } else {
        <Navigate to="/login"></Navigate>
    }
}
