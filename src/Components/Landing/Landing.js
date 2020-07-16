import React from 'react'
import { Link } from 'react-router-dom'


export default function Landing() {
    return (
        <>
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