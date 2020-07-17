import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Login from '../../Components/Login/Login'

export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    }

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/main'
        history.push(destination)
    }

    render() {
        return (
            <>
            <section>
                <Login 
                onLoginSuccess={this.handleLoginSuccess} 
                />
                <p>Need an account?</p>
                <Link to='/signup'>
                    Register
                </Link>
            </section>
            </>
        )
    }
}