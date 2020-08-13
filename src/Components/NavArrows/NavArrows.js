import React from 'react'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import Button from '@material-ui/core/Button'


const NavArrows = (props) => {
    
    return (
        <>
            <div className={'navArrowContainer ' + 
            ( props.styleName || '')}>
                <Button 
                disabled={props.page <= 1 ? true : false}
                onClick={props.onBackArrowClick}
                >
                    <NavigateBeforeIcon />
                </Button>

                <Button
                onClick={props.onNextArrowClick}
                disabled={props.error || props.articleArrayLength < 9 ?
                true : false}
                >
                    <NavigateNextIcon />
                </Button>
            </div>
        </>
    )
}

export default NavArrows