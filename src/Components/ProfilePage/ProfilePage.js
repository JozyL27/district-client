import React, { Component } from 'react'
import UserContext from '../../Context/UserContext'
import UserService from '../../services/user-service'
import ArticlesService from '../../services/article-service'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import ArticleCard from '../ArticleCard/ArticleCard'
import NavArrows from '../NavArrows/NavArrows'
import '../../Styles/ProfilePage.css'
import avatar from '../../illustrations/01.png'
import EditProfileCard from '../EditProfileCard/EditProfileCard'


export default class ProfilePage extends Component {
    static contextType = UserContext
    state = { articles: [], userInfo: {}, 
    error: null, page: 1, isEditing: false, bio: '', username: '' }

    componentDidMount() {
        const { user } = this.context || {}
        const { page } = this.state
        UserService.getAuthorInfo(user.id)
        .then(res => {
            res.error ? this.setState({ error: res.error })
            : this.setState({ userInfo: res, bio: res.bio, 
                username: res.username })

            ArticlesService.getMyArticles(user.id, page)
            .then(res => res.error ?
                this.setState({ error: res.error})
                : this.setState({ articles: res })
                )
        })
    }

    handleEditButton = () => {
        let { isEditing } = this.state
        this.setState({ isEditing: !isEditing })
    }

    handleCancelButton = () => {
        let { isEditing, userInfo } = this.state
        this.setState({ isEditing: !isEditing, bio: userInfo.bio })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { userInfo, articles, page, 
            isEditing, bio, username } = this.state || {}
            console.log(bio, username)
        return (
            <section className='profilePageContainer'>
                {!isEditing ?
                <>
                    <div className='userInfoContainer'>
                        <img 
                        src={avatar} 
                        alt='avatar' 
                        className='profileAvatar'
                        />
                        <div className='bioContainer'>
                            <span className='profileUsername'>{userInfo.username}</span>
                            {userInfo.bio && <p className='profileBio'>{userInfo.bio}</p>}
                        </div>
                    </div>
                    <div className='profileButtonContainer'>
                        <Button 
                        variant='contained' 
                        color='primary'
                        onClick={this.handleEditButton}
                        >
                            Edit Profile
                        </Button>
                    </div>
                </>
                : 
                <EditProfileCard 
                avatar={avatar}
                username={username}
                bio={bio}
                handleBioChange={this.handleChange}
                handleCancelButton={this.handleCancelButton}
                />
                }
                <div className='profileFabContainer'>
                    <Fab>
                        <AddIcon />
                    </Fab>
                </div>
                <ul className='profileArticles'>
                    {articles.length > 0 && articles.map(article => {
                        return (
                        <ArticleCard 
                        id={article.id}
                        key={article.id}
                        username={userInfo.username}
                        title={article.title}
                        upvotes={article.upvotes}
                        date_published={article.date_published}
                        />
                        )
                    })}
                </ul>
                {articles.length === 9 &&
                <NavArrows 
                styleName='profileNavArrows'
                page={page}
                />}
            </section>
        )
    }
}