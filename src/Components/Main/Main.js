import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import UserContext from '../../Context/UserContext'


export default class Main extends Component {
    static contextType = UserContext

    handleClick = () => {
        this.context.processLogout()
    }

    render() {
        return (
            <>
                <h2>I am the main component!</h2>
                <Button
                onClick={this.handleClick}
                >
                    Log me out turbo
                </Button>
            </>
        )
    }
}