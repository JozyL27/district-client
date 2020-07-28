import React from 'react'
import { Link } from 'react-router-dom'

export default function ArticleCard(props) {
    return (
        <>
            <li className='articleCard' key={props.id}>
                <h3>{props.title}</h3>
                <p>{props.content}</p>
                <div>
                    <span>{props.upvotes}</span>
                    <span>{props.style}</span>
                </div>
                <span>
                    <Link to={`/article/${props.id}`}>
                        View Article
                    </Link>
                </span>
            </li>
        </>
    )
}