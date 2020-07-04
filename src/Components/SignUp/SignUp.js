import React, { Component } from 'react'


export default class SignUp extends Component {
    render() {
        return (
            <section>
                <form>
                    <label htmlFor='username'>username</label>
                    <input id='username'></input>
                    <label htmlFor='email'>email</label>
                    <input id='email'></input>
                    <label htmlFor='password'>password</label>
                    <input id='password'></input>
                </form>
            </section>
        )
    }
}