import React, { Component } from 'react'
import Menu from '../Menu/Menu'
import { Link } from 'react-router-dom'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import '../../Styles/Header.css'

export default class Header extends Component {
    render() {
        return (
            <>
                <header id="outer-container">
                    <h1 className='h1Header'>
                        <Link to='/' className='routerLink'>
                            Cardigan
                        </Link>
                    </h1>
                    <BurgerMenu />
                    <Menu />
                </header>
            </>
        )
    }
}