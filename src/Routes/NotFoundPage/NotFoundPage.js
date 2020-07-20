import React from 'react'
import imgTwo from '../../illustrations/10.png'
import '../../Styles/NotFoundPage.css'

export default function NotFoundPage() {
    return (
        <section className='notContainer'>
            <h2>Error code: 404</h2>
            <div className='notDiv'>
                <p className='notPara'>The page you're looking for does not exist.</p>
                <img src={imgTwo} 
                alt='brick wall'
                className='notImg'
                />
            </div>
        </section>
    )
}