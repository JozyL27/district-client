import React, { Component } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional for styling
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


export default class SignUp extends Component {
    static defaultProps = {
        onRegistrationSuccess: () => {},
    }

    componentDidMount() {
        this.setState({
            error: null,
            email: '',
            password: '',
            username: '',
            validate: '',
        })
    }

    state = {
        error: null,
        email: '',
        username: '',
        password: '',
        validate: '',
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ error: null })
        const { email, password, username, validate } = this.state
        const values = { email, password, username, validate }

        values.password === values.validate ?
        console.log(values) : this.setState({ error: 'Uh oh error!' })
    }

    render() {
        const { username, email, password, validate, error } = this.state
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    {error && <p>uh oh error!</p>}
                    <TextField 
                    id='username' 
                    label='username'
                    variant='outlined'
                    onChange={(event) => {this.handleChange(event)}}
                    required
                    value={username}
                    name='username'
                    />
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
                    <Tippy
                    content='Requires an uppercase letter, 
                    special character, and 
                    must be at least 8 characters long.'
                    delay={100}
                    interactive={true}
                    interactiveBorder={20}
                    >
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
                    </Tippy>
                    <TextField 
                    id='validate' 
                    label='validate password'
                    variant='outlined'
                    onChange={(event) => {this.handleChange(event)}}
                    required
                    value={validate}
                    name='validate'
                    type='password'
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