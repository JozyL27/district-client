import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'


export default function Landing() {
    return (
        <>
        <Header />

        <div className='registerDiv'>
        <p>Need an account?</p>
        <Link 
        to='/signup'
        >
        register
        </Link>
        </div>
        </>
    )
}