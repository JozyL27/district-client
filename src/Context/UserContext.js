import React, { Component } from 'react'
import TokenService from '../services/token-service'

const UserContext = React.createContext({
    user: {},
    error: null,
    setError: () => {},
    clearError: () => {},
    setUser: () => {},
    processLogin: () => {},
    processLogout: () => {},
})

export default UserContext

export class UserProvider extends Component {
    constructor(props) {
        super(props)
        const state = { user: {}, error: null }

        const jwtPayload = TokenService.parseAuthToken()

        if (jwtPayload)
            state.user = {
                id: jwtPayload.user_id,
                email: jwtPayload.email,
                username: jwtPayload.sub,
            }
        
        this.state = state
    }

    setError = error => {
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    setUser = user => {
        this.setState({ user })
    }

    processLogin = authToken => {
        TokenService.saveAuthToken(authToken)
        const jwtPayload = TokenService.parseAuthToken()
        this.setUser({
            id: jwtPayload.user_id,
            email: jwtPayload.email,
            username: jwtPayload.sub,
        })
    }

    processLogout = () => {
        TokenService.clearAuthToken()
        this.setUser({})
    }

    render() {
        const values = {
            user: this.state.user,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setUser: this.setUser,
            processLogin: this.processLogin,
            processLogout: this.processLogout,

        }
        return (
            <UserContext.Provider value={values}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}