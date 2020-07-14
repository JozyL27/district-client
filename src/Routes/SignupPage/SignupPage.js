import React, { Component } from 'react'
import Header from '../../Components/Header/Header'
import { Link } from 'react-router-dom'
import SignUp from '../../Components/SignUp/SignUp'

export default class SignupPage extends Component {
    render() {
        return (
            <>
            <Header />
            <section>
                <SignUp />

                <p>Already have an account?</p>
                <Link to='/login'>
                    Login
                </Link>
            </section>
            </>
        )
    }
}