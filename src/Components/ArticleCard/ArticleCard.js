import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../../illustrations/01.png'
import '../../Styles/ArticleCard.css'
import Upvote from '../Upvote/Upvote'

export default function ArticleCard(props) {
    return (
        <>
            <li className='articleCard' key={props.id}>
                <div className='userContainer'>
                    <img src={avatar} 
                    alt='avatar' 
                    className='cardAvatar'
                    />
                </div>
                <div className='contentContainer'>
                    <h3 className='cardH3'>{props.title}</h3>
                    <span className='cardUsername'>By {props.username}</span>
                </div>
                <div className='articleLinkDiv'>
                    <Upvote 
                    upvotes={props.upvotes}
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