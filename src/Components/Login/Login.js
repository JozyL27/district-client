import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


export default class Login extends Component {
    state = { error: null, email: '', password: '' }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { email, password } = this.state
        return (
            <>
                <form>
                    <TextField 
                    id='email' 
                    label='email'
                    variant='outlined'
                    onChange={(event) => {this.handleChange(event)}}
                    required
                    value={email}
                    name='email'
                    type='email'
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