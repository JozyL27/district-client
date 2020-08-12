import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import '../../Styles/AddComment.css'
import Button from '@material-ui/core/Button'


const AddComment = (props) => {
    const [ Text, setText ] = useState('')
    let [ Open, setOpen ] = useState(false)

    const handleAddCommentButton = () => {
        setOpen(!Open)
    }

    const handleTextArea = (event) => {
        setText(event.target.value)
    }

    const handleSendButton = () => {
        props.onAddCommentClick()
        setOpen(!Open)
    }

    return (
        <section className='addCommentSection'>
            <div className='addCommentButton'>
                <Fab 
                variant='extended'
                onClick={handleAddCommentButton}
                >
                    <AddIcon />
                    Add Comment
                </Fab>
            </div>
            <Dialog
            open={Open}
            onClose={handleAddCommentButton}
            maxWidth='sm'
            fullWidth={true}
            >
                <DialogTitle>Add comment</DialogTitle>
                <DialogContent>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="content"
                    label="comment"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    variant='outlined'
                    value={Text}
                    onChange={handleTextArea}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddCommentButton} color='secondary'>
                        Cancel
                    </Button>
                    <Button onClick={handleSendButton} color='primary'>
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    )
}

export default AddComment