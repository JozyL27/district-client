import React, { Component } from 'react'


export default class Login extends Component {
    render() {
        return (
            <>
                <form>
                    <label htmlFor='email'>email</label>
                    <input id='email'></input>
                    <label htmlFor='password'>password</label>
                    <input id='password'></input>
                </form>
            </>
        )
    }
}