import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../../Styles/ArticleCard.css'
import Upvote from '../Upvote/Upvote'
import moment from 'moment'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import UserContext from '../../Context/UserContext'
import TokenService from '../../services/token-service'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        marginRight: '0',
        marginLeft: 'auto'
    }
})

export default function ArticleCard(props) {
    const userContext = useContext(UserContext)
    const classes = useStyles()
    const { user } = userContext

    return (
        <>
            <li className='articleCard' key={props.id}>
                <div className='userContainer'>
                    <Avatar src={props.avatar} />
                    {TokenService.hasAuthToken() && user.id === props.author ?
                    <IconButton 
                    aria-label='delete' 
                    className={classes.root}
                    onClick={() => { props.onDeleteClick(props.id) }}
                    >
                        <DeleteIcon fontSize='small' />
                    </IconButton>
                    :
                    null}
                </div>
                <div className='contentContainer'>
                    <h3 className='cardH3'>{props.title}</h3>
                    <span className='cardUsername'>By {props.username}</span>
                    <span className='publishDate'>
                        Published {moment.utc(`${props.date_published}`).format('MMMM Do YYYY')}
                    </span>
                </div>
                <div className='articleLinkDiv'>
                    <Upvote 
                    upvotes={props.upvotes}
                    articleId={props.id}
                    styleName='cardUpvote'
                    />
                    <Link 
                    to={`/article/${props.id}`} 
                    className='articleLink'
                    >
                        View Article
                    </Link>
                </div>
            </li>
        </>
    )
}