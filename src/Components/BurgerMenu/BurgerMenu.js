import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import UserContext from '../../Context/UserContext'
import TokenService from '../../services/token-service'
import '../../Styles/BurgerMenu.css'

export default class BurgerMenu extends Component {
    static contextType = UserContext

    state = { open: false }

    handleLinkClick = () => {
        this.setState({ open: false })
    }

    handleLogoutClick = () => {
        this.context.processLogout()
        this.setState({ open: false })
    }

    handleStateChange(state) {
        this.setState({ open: state.isOpen })
    }

    renderLoginLink = () => {
        return (
            <>
                <li className='burgerLi'>
                    <Link 
                    to='/login' 
                    className='burgerLink'
                    onClick={this.handleLinkClick}
                    >
                        Login
                    </Link>
                </li>
                <li className='burgerLi'>
                    <Link 
                    to='/signup' 
                    className='burgerLink'
                    onClick={this.handleLinkClick}
                    >
                        Register
                    </Link>
                </li>
            </>
        )
    }

    renderLogoutLink = () => {
        return (
            <>
                <li className='burgerLi'>
                    <Link 
                    to='/login' 
                    className='burgerLink'
                    onClick={this.handleLogoutClick}
                    >
                    Logout
                    </Link>
                </li>
            </>
        )
    }

    render() {
        return(
            <>
                <Menu 
                    right 
                    outerContainerId={"outer-container"}
                    width={ '280px' }
                    noOverlay
                    isOpen={this.state.open}
                    onStateChange={(state) => this.handleStateChange(state)}
                    >
                        <ul className='burgerUl'>
                            <li className='burgerLi'>explore</li>
                            {TokenService.hasAuthToken() ? 
                            this.renderLogoutLink() : 
                            this.renderLoginLink()}
                        </ul>
                </Menu>
            </>
        )
    }
}