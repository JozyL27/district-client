import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../Context/UserContext'
import TokenService from '../../services/token-service'
import '../../Styles/Menu.css'

export default function Menu() {
    const context = useContext(UserContext)

    const handleLogoutClick = () => {
        context.processLogout()
    }

    const renderLoginLink = () => {
        return (
            <>
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
            </>
        )
    }

    const renderLogoutLink = () => {
        return (
            <>
                <li className='navLink'>
                    <Link 
                    to='/login'
                    className='menuLink'
                    onClick={handleLogoutClick}
                    >
                    Logout
                    </Link>
                </li>
            </>
        )
    }

    return (
        <>
            <ul className='navContainer'>
                <li className='navLink'>Explore</li>
                {TokenService.hasAuthToken() ? renderLogoutLink()
                : renderLoginLink()}
            </ul>
        </>
    )
}