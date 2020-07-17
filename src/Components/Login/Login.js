import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


export default class Login extends Component {
    static defaultProps = {
        onLoginSuccess: () => {}
    }

    state = { error: null, username: '', password: '' }

    componentDidMount() {
        this.setState({ error: null, username: '', password: '' })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
    }

    render() {
        const { username, password, error } = this.state
        return (
            <>
                <form onSubmit={this.onSubmit}>
                    {error && <p>{error || error.message}</p>}
                    <TextField 
                    id='username' 
                    label='username'
                    variant='outlined'
                    onChange={(event) => {this.handleChange(event)}}
                    required
                    value={username}
                    name='username'
                    type='text'
                    />
                    <TextField 
                    id='password' 
                    label='password'
                    variant='outlined'
                    onChange={(event) => {this.handleChange(event)}}
                    required
                    value={password}
                    type='password'
                    name='password'
                    />
                    <Button 
                    variant='contained' 
                    color='secondary'
                    type='submit'
                    >Submit</Button>
                </form>
            </>
        )
    }
}