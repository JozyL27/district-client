import React from 'react'
import { Link } from 'react-router-dom'
import '../../Styles/Header.css'

export default function Header() {
    return (
        <>
        <Link to='/' className='routerLink'>
            <h1 className='h1Header'>District</h1>
        </Link>
        </>
    )
}