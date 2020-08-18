import React, { Component } from 'react'
import UserContext from '../../Context/UserContext'
import UserService from '../../services/user-service'
import ArticlesService from '../../services/article-service'
import Button from '@material-ui/core/Button'
import ArticleCard from '../ArticleCard/ArticleCard'
import NavArrows from '../NavArrows/NavArrows'
import '../../Styles/ProfilePage.css'
import avatar from '../../illustrations/01.png'
import EditProfileCard from '../EditProfileCard/EditProfileCard'
import AddArticle from '../AddArticle/AddArticle'


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
        this.setState({ isEditing: !isEditing, error: null })
    }

    handleCancelButton = () => {
        let { isEditing, userInfo } = this.state
        this.setState({ isEditing: !isEditing, 
            bio: userInfo.bio, username: userInfo.username, 
            error: null })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleNextArrow = () => {
        let { page } = this.state
        const { user } = this.context
        const newPageValue = page += 1
        this.setState({ page: newPageValue })

        ArticlesService.getMyArticles(user.id, page)
        .then(res => res.error ?
            this.setState({ error: res.error, articles: [] })
            : this.setState({ articles: res })
            )
    }

    handleBackArrow = () => {
        let { page } = this.state
        const { user } = this.context
        const newPageValue = page -= 1
        this.setState({ page: newPageValue, error: null })

        ArticlesService.getMyArticles(user.id, page)
        .then(res => res.error ?
            this.setState({ error: res.error})
            : this.setState({ articles: res })
            )
    }

    handleDeleteArticleButton = (id) => {
        let { page } = this.state
        const { user } = this.context

        ArticlesService.deleteArticle(id)
        .then(() => {
            ArticlesService.getMyArticles(user.id, page)
            .then(res => res.error ?
                this.setState({ error: res.error})
                : this.setState({ articles: res })
                )
        })
    }

    handleSaveButton = () => {
        let { username, bio, isEditing } = this.state
        const { user } = this.context
        const newUserInfo = { username, bio }

        UserService.updateUserInfo(user.id, newUserInfo)
        .then(res => {
            if(res.error) {
                this.setState({ error: res.error })
            } else {
                UserService.getAuthorInfo(user.id)
                .then(res => {
                    this.setState({
                        isEditing: !isEditing,
                        username: res.username,
                        bio: res.bio,
                        userInfo: res,
                        error: null
                    })
                })
            }
        })
    }

    handleAddArticleButton = () => {
        const { user } = this.context || {}
        const { page } = this.state
        
        ArticlesService.getMyArticles(user.id, page)
        .then(res => res.error ?
            this.setState({ error: res.error})
            : this.setState({ articles: res })
            )
    }

    render() {
        const { userInfo, articles, page, 
            isEditing, bio, username, error } = this.state || {}

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
                handleSaveButton={this.handleSaveButton}
                />
                }
                {error && <p>{error}</p>}
                <AddArticle 
                addArticle={this.handleAddArticleButton}
                userInfo={this.context.user}
                />
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
                        author={article.author}
                        onDeleteClick={this.handleDeleteArticleButton}
                        />
                        )
                    })}
                </ul>
                <NavArrows 
                styleName='profileNavArrows'
                page={page}
                onNextArrowClick={this.handleNextArrow}
                onBackArrowClick={this.handleBackArrow}
                articleArrayLength={articles.length}
                error={error}
                />
            </section>
        )
    }
}