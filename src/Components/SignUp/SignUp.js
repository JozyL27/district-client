import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'


export default class SignUp extends Component {
    render() {
        return (
            <>
            <Header />
            <section>

                <form>
                    <label htmlFor='username'>username</label>
                    <input id='username'></input>
                    <label htmlFor='email'>email</label>
                    <input id='email'></input>
                    <label htmlFor='password'>password</label>
                    <input id='password'></input>
                </form>

                <p>Already have an account?</p>
                <Link to='/login'>
                Login
                </Link>
            </section>
            </>
        )
    }
}