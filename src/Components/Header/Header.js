import React, { Component } from 'react'
import Menu from '../Menu/Menu'
import { Link } from 'react-router-dom'
import { slide as BurgerMenu } from 'react-burger-menu'
import UserContext from '../../Context/UserContext'
import '../../Styles/Header.css'

export default class Header extends Component {
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

    render() {
        return (
            <>
                <header id="outer-container">
                    <h1 className='h1Header'>
                        <Link to='/' className='routerLink'>
                            Havior
                        </Link>
                    </h1>

                    <BurgerMenu 
                    right 
                    outerContainerId={"outer-container"}
                    width={ '280px' }
                    noOverlay
                    isOpen={this.state.open}
                    onStateChange={(state) => this.handleStateChange(state)}
                    >
                    </BurgerMenu>
                    <Menu />
                </header>
            </>
        )
    }
}