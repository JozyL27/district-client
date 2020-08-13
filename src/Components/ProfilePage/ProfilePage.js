import React, { Component } from 'react'
import UserContext from '../../Context/UserContext'


export default class ProfilePage extends Component {
    static contextType = UserContext

    render() {
        console.log(this.context.user)
        const { user } = this.context || {}
        return (
            <>
                <p>I am {user.username} profile!</p>
            </>
        )
    }
}