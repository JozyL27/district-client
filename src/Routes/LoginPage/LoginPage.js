import React, { Component } from 'react'
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
            <section className='formSection'>
                <Login 
                onLoginSuccess={this.handleLoginSuccess} 
                />
            </section>
            </>
        )
    }
}