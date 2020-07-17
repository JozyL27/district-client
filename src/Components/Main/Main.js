import React, { Component } from 'react'
import Button from '@material-ui/core/Button'


export default class Main extends Component {
    handleClick = () => {
        console.log('ive been clicked!')
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