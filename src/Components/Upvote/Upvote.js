import React from 'react'
import upArrow from '../../illustrations/up-arrow.svg'

export default function Upvote(props) {
    return (
        <>
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
        </>
    )
}