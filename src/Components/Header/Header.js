import React from 'react'
import Menu from '../Menu/Menu'
import { Link } from 'react-router-dom'
import '../../Styles/Header.css'

export default function Header() {
    return (
        <>
        <header className='headContainer'>
            <h1 className='h1Header'>
                <Link to='/' className='routerLink'>
                    Havior
                </Link>
            </h1>

            <Menu />
        </header>
        </>
    )
}