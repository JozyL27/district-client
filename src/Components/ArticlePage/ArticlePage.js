import React, { useState, useEffect } from 'react'
import ArticlesService from '../../services/article-service'


export default function ArticlePage(props) {
    const [ Article, setArticle ] = useState( {} )
    useEffect(() => {
        const { articleId } = props.match.params
        ArticlesService.GetArticleById(articleId)
        .then(article => setArticle(article))
    }, [])
    console.log(Article)
    return (
        <section className='articlePageContainer'>
            <h2>{Article.title}</h2>
            <p>{Article.content}</p>
            <span>{Article.upvotes}</span>
            <span>{Article.style}</span>
        </section>
    )
}