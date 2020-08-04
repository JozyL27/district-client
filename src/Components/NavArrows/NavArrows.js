import React from 'react'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'


const NavArrows = (props) => {
    return (
        <>
            <div className={'navArrowContainer ' + 
            ( props.styleName || '')}>
                <span>
                    <NavigateBeforeIcon />
                </span>

                <span>
                    <NavigateNextIcon />
                </span>
            </div>
        </>
    )
}

export default NavArrows