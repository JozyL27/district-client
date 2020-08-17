import React, { useState } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import '../../Styles/AddArticle.css'
import { Toolbar, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const AddArticle = (props) => {
    const classes = useStyles()
    const [ open, setOpen ] = useState(false)

    const onAddArticleClick = () => {
        setOpen(!open)
    }

    return (
        <>
            <div className='profileFabContainer'>
                <Fab
                onClick={onAddArticleClick}
                >
                    <AddIcon />
                </Fab>
                <Dialog 
                fullScreen open={open} 
                onClose={onAddArticleClick} 
                TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton 
                            edge='start' 
                            onClick={onAddArticleClick} 
                            araia-label='close' 
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography variant='h6' className={classes.title}>
                                New Article
                            </Typography>
                            <Button autoFocus color='inherit' >
                                Create Article
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Dialog>
            </div>
        </>
    )
}

export default AddArticle