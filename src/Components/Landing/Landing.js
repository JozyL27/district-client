import React from 'react'
import Typist from 'react-typist-repacked'
import imageOne from '../../illustrations/04.png'
import '../../Styles/Landing.css'


export default function Landing() {
    return (
        <>
        <div className='landingDiv'>
            <img src={imageOne} alt='glasses' className='landingImg' />
            <Typist>
                A blogsite for
                {' '}
                <span>
                    avant garde
                </span>
                <Typist.Backspace count={11} delay={1000} />
                <span>
                    minimalist
                </span>
                <Typist.Backspace count={10} delay={1000} />
                <span>
                    vintage
                </span>
                <Typist.Backspace count={7} delay={1000} />
                <span>
                    streetwear
                </span>
                <Typist.Backspace count={10} delay={1000} />
                    luxury
                <Typist.Backspace count={7} delay={2000} />
                    {' '}
                    menswear.
            </Typist>
        </div>
        </>
    )
}