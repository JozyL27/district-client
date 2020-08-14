import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import '../../Styles/EditProfileCard.css'


const EditProfileCard = (props) => {
    return (
        <>
            <div className='userInfoContainer'>
                <img 
                src={props.avatar} 
                alt='avatar' 
                className='profileAvatar'
                />
                <div className='bioContainer'>
                    <div className='editUsername'>
                        <TextField 
                        label='Username'
                        variant='outlined'
                        value={props.username}
                        />
                    </div>
                    {props.bio && 
                    <div className='editBio'>
                        <TextField 
                        label='Bio'
                        multiline
                        rows={5}
                        variant='outlined'
                        value={props.bio}
                        />
                    </div>
                    }
                </div>
            </div>
            <div className='profileButtonsContainer'>
                <div>
                    <Button 
                    variant='contained' 
                    color='secondary'
                    onClick={props.handleCancelButton}
                    >
                        Cancel
                    </Button>
                </div>
                <div>
                    <Button 
                    variant='contained'
                    color='primary'
                    >
                        Save
                    </Button>
                </div>
            </div>
        </>
    )
}

export default EditProfileCard