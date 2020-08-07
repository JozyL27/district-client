import React, { useContext } from 'react'
import UserContext from '../../Context/UserContext'
import avatar from '../../illustrations/01.png'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import './CommentCard.css'

const CommentCard = (props) => {
    const Context = useContext(UserContext)
    const { user } = Context
    console.log(moment.utc(`${props.date_commented}`).format('MMMM Do YYYY'))

    return (
        <>
            <li className='commentContainer' key={props.id}>
                <div className='avatarCommentContainer'>
                    <img 
                    src={avatar} 
                    alt='avatar' 
                    className='commentAvatar'
                    />
                    <span className='commentUsername'>{props.username}</span>
                </div>
                <div className='buttonsAndContent'>
                    <div>
                        <p className='commentContent'>{props.text}</p>
                        {/* <span>{moment(props.date_commented)}</span> */}
                    </div>
                    { user.id === props.user_id ? 
                    <div className='commentButtons'>
                        <Button 
                        variant='text' 
                        >Edit</Button>
                        <Button 
                        variant='text' 
                        >Delete</Button>
                    </div> : 
                    <span 
                    className='commentSpan'>
                    {props.username}
                    </span>}
                </div>
            </li>
        </>
    )
}

export default CommentCard