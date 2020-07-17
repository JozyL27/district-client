import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SignUp from '../../Components/SignUp/SignUp'

export default class SignupPage extends Component {
    static defaultProps = {
        history: {
            push: () => {},
        },
    }

    handleRegistrationSuccess = () => {
        const { history } = this.props
        history.push('/login')
    }

    render() {
        return (
            <>
            <section>
                <SignUp 
                onRegistrationSuccess={this.handleRegistrationSuccess}
                />
                <p>Already have an account?</p>
                <Link to='/login'>
                    Login
                </Link>
            </section>
            </>
        )
    }
}