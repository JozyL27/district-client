import React, { Component } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional for styling
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AuthApiService from '../../services/auth-api-service'
import '../../Styles/Forms.css'
import { Link } from 'react-router-dom'


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
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ error: null })
        const { email, password, username, validate } = this.state
        const newUser = { email, password, username }

        if (password.trim() === validate.trim()) {
            AuthApiService.postUser(newUser)
                .then(() => {
                    this.setState({
                        email: '',
                        password: '',
                        username: '',
                        validate: '',
                    })
                    this.props.onRegistrationSuccess()
                })
                .catch(res => this.setState({ error: res.error }))
        } else if(password.trim() !== validate.trim()) {
            this.setState({ error: 'Passwords do not match.'})
        }
    }

    render() {
        const { username, email, password, validate, error } = this.state
        return (
            <>
                <form onSubmit={this.handleSubmit} className='regForm'>
                    <p className='regPara'>Register</p>
                    {error && <p>{error || error.message}</p>}
                    <TextField 
                    id='username' 
                    label='username'
                    variant='outlined'
                    onChange={(event) => {this.handleChange(event)}}
                    required
                    value={username}
                    name='username'
                    margin='normal'
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
                    margin='normal'
                    />
                    <Tippy
                    content='Requires an uppercase letter, 
                    special character, and 
                    must be at least 8 characters long.'
                    delay={100}
                    interactive={true}
                    interactiveBorder={20}
                    appendTo={() => document.body}
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
                        margin='normal'
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
                    margin='normal'
                    />
                    <Button 
                    variant='contained' 
                    color='secondary'
                    type='submit'
                    >Submit</Button>
                    
                    <p className='formPara'>Already have an account?</p>
                    <Link to='/login' className='formLink'>
                        Login
                    </Link>
                </form>
            </>
        )
    }
}