import React, { Component } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'; // optional for styling


export default class SignUp extends Component {
    static defaultProps = {
        onRegistrationSuccess: () => {},
    }

    componentDidMount() {
        this.firstInput.focus()
        this.setState({
            error: null,
            email: '',
            password: '',
            username: '',
        })
    }

    state = {
        error: null,
        email: '',
        username: '',
        password: '',
    }

    render() {
        return (
            <>
                <form>
                    <label htmlFor='username'>username</label>
                    <input id='username' ref={(input) => 
                        { this.firstInput = input}}></input>
                    <label htmlFor='email'>email</label>
                    <input id='email'></input>
                    <label htmlFor='password'>password</label>
                    <Tippy
                    content='Requires an uppercase letter, 
                    special character, and 
                    must be at least 8 characters long.'
                    delay={100}
                    interactive={true}
                    interactiveBorder={20}
                    >
                        <input id='password'></input>
                    </Tippy>
                    <label htmlFor='password'>validate password</label>
                    <input id='validatePassword'></input>
                </form>
            </>
        )
    }
}