import React from 'react'
import imageOne from '../../illustrations/04.png'
import '../../Styles/Landing.css'


export default function Landing() {
    return (
        <>
        <div className='landingDiv'>
            <img src={imageOne} alt='glasses' className='landingImg' />
            <p className='landingPara'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit 
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                occaecat cupidatat non proident, sunt in culpa qui officia 
                deserunt mollit anim id est laborum.
            </p>
        </div>
        </>
    )
}