import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArticlesService from '../../services/article-service'
import '../../Styles/Explore.css'


export default class CategoryFilter extends Component {
    static defaultProps = {
        handleCategoryChange: () => {},
    }

    state = { categoryValues: [] }

    handleChange = (event) => {
        this.props.handleCategoryChange(event.target.value)
    }

    componentDidMount() {
        ArticlesService.getArticleCategories()
        .then(data => this.setState({ categoryValues: data }))
    }

    render() {
        const { categoryValues } = this.state
        return (
            <>
                <FormControl variant='outlined' fullWidth>
                    <InputLabel id='category'>Category</InputLabel>
                    <Select 
                    labelId='category'
                    id='categorySelect'
                    value={this.props.category}
                    onChange={this.handleChange}
                    label='Category'
                    >
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