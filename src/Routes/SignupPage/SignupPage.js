import React, { Component } from 'react'
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
            <section className='formSection'>
                <SignUp 
                onRegistrationSuccess={this.handleRegistrationSuccess}
                />
            </section>
            </>
        )
    }
}