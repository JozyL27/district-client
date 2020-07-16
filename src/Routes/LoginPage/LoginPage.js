import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Login from '../../Components/Login/Login'

export default class LoginPage extends Component {
    render() {
        return (
            <>
            <section>
                <Login />
                <p>Need an account?</p>
                <Link to='/signup'>
                    Register
                </Link>
            </section>
            </>
        )
    }
}