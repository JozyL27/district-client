import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArticlesService from '../../services/article-service'
import '../../Styles/Explore.css'


export default class CategoryFilter extends Component {
    state = { category: '', categoryValues: [] }

    // add category to context and on change call api to retrieve articles
    // with category filter

    handleChange = (event) => {
        this.setState({ category: event.target.value })
    }

    componentDidMount() {
        ArticlesService.getArticles()
        .then(data => this.setState({ categoryValues: data }))
    }

    render() {
        const { categoryValues } = this.state
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
                        <MenuItem value='Latest'>
                            Latest
                        </MenuItem>
                        {categoryValues.map((el, idx) => 
                        <MenuItem 
                        value={el.category}
                        key={idx}
                        >
                        {el.category}
                        </MenuItem>)}
                    </Select>
                </FormControl>
            </>
        )
    }
}