import React, { Component } from 'react'
import CategoryFilter from '../CategoryFilter/CategoryFilter'
import '../../Styles/Explore.css'
import ArticlesService from '../../services/article-service'
import ArticleCard from '../ArticleCard/ArticleCard'

// add next button that calls the category and page number
export default class Explore extends Component {
    state = { category: '', articles: [], page: 1, error: null }

    setCategory = (value) => {
        this.setState({ category: value })
    }

    componentDidMount() {
        ArticlesService.getPopularArticles()
        .then(data => this.setState({ articles: data }))
    }

    componentDidUpdate(prevProps, prevState) {
        let { category, page } = this.state
        
        if (prevState.category !== this.state.category) {
            ArticlesService.getArticlesByCategory(category, page)
            .then(data => this.setState({ articles: data }))
        }
    }

    componentWillUnmount() {
        this.setState({ category: '', 
        articles: [], page: 1, error: null })
    }

    render() {
        const { articles, category } = this.state
        console.log(this.state.articles)
        return (
            <section className='exploreContainer'>
                <h2 className='exploreH2'>
                    {category.length > 1 ? `Most Popular ${category}` 
                    : 'Most Popular'} Articles</h2>
                <div className='filterContainer'>
                    <CategoryFilter 
                    handleCategoryChange={this.setCategory}
                    category={this.state.category}
                    />
                    {articles.error && <p>{articles.error}</p>}
                </div>
                <ul className='articlesContainer'>
                    {articles.length > 0 && articles.map(article => 
                    <ArticleCard 
                    id={article.id}
                    key={article.id}
                    title={article.title}
                    content={article.content}
                    style={article.style}
                    upvotes={article.upvotes}
                    />)}
                </ul>
            </section>
        )
    }
}