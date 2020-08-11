import React, { useEffect, useState } from 'react'
import ArticlesService from '../../services/article-service'
import avatar from '../../illustrations/01.png'
import Upvote from '../Upvote/Upvote'
import Button from '@material-ui/core/Button'
import CommentsService from '../../services/comments-service'
import CommentCard from '../CommentCard/CommentCard'
import moment from 'moment'
import '../../Styles/ArticlePage.css'

// view more comments: use spread operator and add existing to new
// sending in 12 comments per page, render button if array length is 12
// add comments button, create edit comment component

export default function ArticlePage(props) {
    const [ Article, setArticle ] = useState({})
    const [ Comments, setComments ] = useState([])
    let [ Page, setPage ] = useState(1)
    const [ touched, setTouched ] = useState(false)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const { articleId } = props.match.params
        ArticlesService.GetArticleById(articleId)
        .then(article => setArticle(article))
        .catch(error => setError(error))
    }, [])

    const onViewCommentsClick = () => {
        setTouched(!touched)

        const { articleId } = props.match.params
        CommentsService.getArticleComments(articleId, Page)
        .then(res => res.error ? 
            setError(res) : 
            setComments(res))
    }

    const onCloseCommentsClick = () => {
        setTouched(!touched)
        setComments([])
        setPage(1)
        setError(null)
    }

    const onViewMoreClick = () => {
        setPage(Page += 1)

        const { articleId } = props.match.params
        CommentsService.getArticleComments(articleId, Page)
        .then(res => res.error ? 
            setError(res) : 
            setComments([...Comments, ...res]))
    }

    const arrOfChecks = 
    [Comments.length > 0, Comments.length % 12 === 0, !error]
    .every(element => element === true)

    const handleDeleteComment = (commentId) => {
        CommentsService.deleteComment(commentId)
        .then(() => {
            const newCommentList = 
            Comments.filter(el => el.id !== commentId)
            setComments(newCommentList)
        })
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
            <span className='pagePublishDate'>
                Published {Article.date_published 
                && moment.utc(`${Article.date_published}`).format('MMMM Do YYYY')}
            </span>
            <p className='pageContent'>{Article.content}</p>
            <div className='pageVoteContainer'>
                <Upvote 
                upvotes={Article.upvotes}
                articleId={Article.id || 1}
                styleName='pageUpvote'
                />
                {!touched ?
                <Button 
                variant='contained'
                color="primary"
                onClick={onViewCommentsClick}
                >View Comments</Button> :
                <Button 
                variant='contained'
                color="secondary"
                onClick={onCloseCommentsClick}
                >Close Comments</Button> }
            </div>
            <ul className='commentsContainer'>
                {Comments.length > 0 
                && Comments.map(element => 
                <CommentCard 
                key={element.id}
                username={element.username}
                date_commented={element.date_commented}
                user_id={element.user_id}
                text={element.text}
                id={element.id}
                onDeleteClick={handleDeleteComment}
                />)}
            </ul>
            {error && 
            <p className='articlePageError'>{error.error}</p>}
            {arrOfChecks ?
            <div className='moreComments'>
                <Button 
                variant='contained'
                color='primary'
                onClick={onViewMoreClick}
                >
                    View More
                </Button>
            </div> : null}
        </section>
    )
}