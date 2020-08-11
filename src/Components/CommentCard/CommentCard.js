import React, { useContext, useState } from 'react'
import UserContext from '../../Context/UserContext'
import avatar from '../../illustrations/01.png'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CommentsService from '../../services/comments-service'
import moment from 'moment'
import './CommentCard.css'

const CommentCard = (props) => {
    const Context = useContext(UserContext)
    const { user } = Context
    const [ editing, setEditing ] = useState(false)
    const [ text, setText ] = useState(props.text)
    const [ error, setError ] = useState(null)

    const handleEditButton = () => {
        setEditing(!editing)
    }

    const handleCancelButton = () => {
        CommentsService.getCommentById(props.id)
        .then(res => {
        setError(null)
        setText(res.text)
        setEditing(!editing)
        })
    }

    const handleChange = (event) => {
        setText(event.target.value)
    }

    const handleSaveButton = () => {
        setError(null)

        CommentsService.editComment(props.id, text)
        .then(res => {
            res.error && setError(res.error)
            setEditing(!editing)
            res.error ? 
            setText(props.text)
            : setText(text)
        })
    }
 
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
                    <div className='contentAndPublish'>
                        {editing ? 
                        <TextField
                        id="outlined-multiline" 
                        label="Edit comment"
                        multiline
                        rows={4}
                        value={text}
                        onChange={handleChange}
                        variant="outlined"
                        />
                        :
                        <p className='commentContent'>{text}</p>}
                        <span className='commentPublishDate'>{moment.utc(`${props.date_commented}`)
                        .format('MMMM Do YYYY')}
                        </span>
                        {error && 
                        <p className='error'>{error}
                        </p>}
                    </div>
                    { user.id === props.user_id ? 
                    <div className='commentButtons'>
                        {editing ? 
                        <Button
                        variant='text'
                        onClick={handleSaveButton}
                        >
                            Save
                        </Button> 
                        :
                        <Button 
                        variant='text'
                        onClick={handleEditButton} 
                        >Edit</Button>}
                        {editing ? 
                        <Button
                        variant='text'
                        onClick={handleCancelButton}
                        >
                            Cancel
                        </Button> :
                        <Button 
                        variant='text'
                        onClick={() => {props.onDeleteClick(props.id)}} 
                        >Delete</Button>}
                    </div> : 
                    <span 
                    className='commentSpan'>
                    {props.username}
                    </span>}
                </div>
            </li>
            {/* {error && 
            <p className='error'>{error}
            </p>} */}
        </>
    )
}

export default CommentCard