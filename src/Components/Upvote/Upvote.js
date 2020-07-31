import React, { useContext } from 'react'
import upArrow from '../../illustrations/up-arrow.svg'
import UserContext from '../../Context/UserContext'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional for styling
import TokenService from '../../services/token-service'

export default function Upvote(props) {
    const userInfo = useContext(UserContext)

    const handleUpvoteClick = () => {

        console.log('clicked!')
        console.log(userInfo)
    }
    return (
        <>
            <div className={'upvoteContainer ' + ( props.styleName || '')}>
                {TokenService.hasAuthToken() ?
                <img 
                src={upArrow} 
                alt='arrow'
                className='upArrow'
                onClick={handleUpvoteClick}
                /> :
                <Tippy
                content="Must be signed in to upvote"
                delay={100}
                interactive={true}
                interactiveBorder={20}
                appendTo={() => document.body}
                >
                    <img 
                    src={upArrow} 
                    alt='arrow'
                    className='upArrow'
                    />
                </Tippy>}
                <span>{props.upvotes}</span>
            </div>
        </>
    )
}