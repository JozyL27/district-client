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
import TextField from '@material-ui/core/TextField'
import CategoryFilter from '../CategoryFilter/CategoryFilter'
import '../../Styles/AddArticle.css'
import { Toolbar, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    textFields: {
        // padding: '20px',
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const AddArticle = (props) => {
    const classes = useStyles()
    const [ open, setOpen ] = useState(false)
    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')
    const [ category, setCategory ] = useState('')


    const onAddArticleClick = () => {
        setOpen(!open)
    }

    const onCreateArticleClick = () => {
        setOpen(false)
        console.log(title, content, category)
    }

    const onTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const onContentChange = (event) => {
        setContent(event.target.value)
    }

    const onCategoryChange = (value) => {
        setCategory(value)
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
                            <Button autoFocus color='inherit' onClick={onCreateArticleClick}>
                                Create Article
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <form className='addArticleForm'>
                        <TextField 
                        id='title'
                        label='Title'
                        name='title'
                        margin='normal'
                        variant='outlined'
                        type='text'
                        onChange={onTitleChange}
                        value={title}
                        required
                        fullWidth
                        />
                        <TextField 
                        id='content'
                        label='Content'
                        name='content'
                        margin='normal'
                        variant='outlined'
                        type='text'
                        onChange={onContentChange}
                        value={content}
                        multiline
                        rows={20}
                        fullWidth
                        />
                        <CategoryFilter 
                        handleCategoryChange={onCategoryChange}
                        category={category}
                        />
                    </form>
                </Dialog>
            </div>
        </>
    )
}

export default AddArticle