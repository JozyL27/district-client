import React from 'react'
import { Link } from 'react-router-dom'
import '../../Styles/Menu.css'

export default function Menu() {
    return (
        <>
            <ul className='navContainer'>
                <li className='navLink'>Explore</li>
                <li className='navLink'>
                    <Link to='/login' className='menuLink'>
                        login
                    </Link>
                </li>
                <li className='navLink'>
                    <Link to='/signup' className='menuLink'>
                        Register
                    </Link>
                </li>
            </ul>
        </>
    )
}