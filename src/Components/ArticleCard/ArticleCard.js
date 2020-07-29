import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../../illustrations/01.png'
import '../../Styles/ArticleCard.css'
import upArrow from '../../illustrations/up-arrow.svg'

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
                    <div className='upvoteContainer'>
                        <img 
                        src={upArrow} 
                        alt='arrow'
                        className='upArrow'
                        />
                        <span>{props.upvotes}</span>
                        <img 
                        src={upArrow} 
                        alt='arrow'
                        className='downArrow' 
                        />
                    </div>
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