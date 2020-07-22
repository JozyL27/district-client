import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../../Styles/Explore.css'


export default class CategoryFilter extends Component {
    state = { category: '' }

    handleChange = (event) => {
        this.setState({ category: event.target.value })
    }

    render() {
        console.log(this.state.category)
        return (
            <>
                <FormControl variant='outlined' fullWidth>
                    <InputLabel id='category'>Category</InputLabel>
                    <Select 
                    labelId='category'
                    id='categorySelect'
                    value={this.state.category}
                    onChange={this.handleChange}
                    label='Category'
                    >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>

                        <MenuItem value='swag'>
                            swag
                        </MenuItem>
                    </Select>
                </FormControl>
            </>
        )
    }
}