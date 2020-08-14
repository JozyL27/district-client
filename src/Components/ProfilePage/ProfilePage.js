import React, { Component } from 'react'
import UserContext from '../../Context/UserContext'
import UserService from '../../services/user-service'
import ArticlesService from '../../services/article-service'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import ArticleCard from '../ArticleCard/ArticleCard'
import NavArrows from '../NavArrows/NavArrows'
import '../../Styles/ProfilePage.css'
import avatar from '../../illustrations/01.png'


export default class ProfilePage extends Component {
    static contextType = UserContext
    state = { articles: [], userInfo: {}, error: null, page: 1 }

    componentDidMount() {
        const { user } = this.context || {}
        const { page } = this.state
        UserService.getAuthorInfo(user.id)
        .then(res => {
            res.error ? this.setState({ error: res.error })
            : this.setState({ userInfo: res })

            ArticlesService.getMyArticles(user.id, page)
            .then(res => res.error ?
                this.setState({ error: res.error})
                : this.setState({ articles: res })
                )
        })
    }

    render() {
        const { userInfo, articles, page } = this.state || {}
        console.log(this.state.articles)
        return (
            <section className='profilePageContainer'>
                <div className='userInfoContainer'>
                    <img 
                    src={avatar} 
                    alt='avatar' 
                    className='profileAvatar'
                    />
                    <div className='bioContainer'>
                        <span className='profileUsername'>{userInfo.username}</span>
                        {/* {userInfo.bio && <p className='profileBio'>{userInfo.bio}</p>} */}
                        <p className='profileBio'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.</p>
                    </div>
                </div>
                <div className='profileButtonContainer'>
                    <Button variant='contained' color='primary'>
                        Edit Profile
                    </Button>
                </div>
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