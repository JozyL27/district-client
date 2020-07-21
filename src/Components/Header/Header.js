import React, { Component } from 'react'
import Menu from '../Menu/Menu'
import { Link } from 'react-router-dom'
import { slide as BurgerMenu } from 'react-burger-menu'
import '../../Styles/Header.css'

export default class Header extends Component {
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
                    >

                    </BurgerMenu>
                    <Menu />
                </header>
            </>
        )
    }
}