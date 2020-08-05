import React, { useEffect, useState } from 'react'
import ArticlesService from '../../services/article-service'
import avatar from '../../illustrations/01.png'
import Upvote from '../Upvote/Upvote'
import Button from '@material-ui/core/Button'
import CommentsService from '../../services/comments-service'
import '../../Styles/ArticlePage.css'

// view more comments: use spread operator and add existing to new
// sending in 12 comments per page, render button if array length is 12
export default function ArticlePage(props) {
    const [ Article, setArticle ] = useState({})
    const [ Comments, setComments ] = useState([])
    const [ Page, setPage ] = useState(1)

    useEffect(() => {
        const { articleId } = props.match.params
        ArticlesService.GetArticleById(articleId)
        .then(article => setArticle(article))
        .catch(error => console.log(error))
    }, [])

    useEffect(() => {

    }, [Comments])

    const onViewCommentsClick = () => {
        const { articleId } = props.match.params
        CommentsService.getArticleComments(articleId, Page)
        .then(res => console.log(res))
    }
    
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
            <div className='pageVoteContainer'>
                <Upvote 
                upvotes={Article.upvotes}
                articleId={Article.id || 1}
                styleName='pageUpvote'
                />
                <Button 
                variant='contained'
                color="primary"
                onClick={onViewCommentsClick}
                >View Comments</Button>
            </div>
            <ul className='commentsContainer'>

            </ul>
        </section>
    )
}