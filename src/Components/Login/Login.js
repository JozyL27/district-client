import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'


export default class Login extends Component {
    render() {
        return (
            <>
                <Header />
                <section>
                    <form>
                        <label htmlFor='email'>email</label>
                        <input id='email'></input>
                        <label htmlFor='password'>password</label>
                        <input id='password'></input>
                    </form>
                    <p>Need an account?</p>
                    <Link to='/signup'>
                        Register
                    </Link>
                </section>
            </>
        )
    }
}