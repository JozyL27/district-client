import React, { useState, useEffect } from 'react'
import ArticlesService from '../../services/article-service'
import avatar from '../../illustrations/01.png'
import Upvote from '../Upvote/Upvote'
import '../../Styles/ArticlePage.css'


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
            <div className='authorInfo'>
                <img 
                src={avatar}
                alt='avatar'
                className='articlePageAvatar'
                />
                <span>{Article.username}</span>
            </div>
            <p className='pageContent'>{Article.content}</p>
            <Upvote 
            upvotes={Article.upvotes}
            />
            <span>{Article.style}</span>
        </section>
    )
}