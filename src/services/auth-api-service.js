import config from '../config'
import TokenService from './token-service'
import axios from 'axios'

const AuthApiService = {
    async postUser(user) {
        try {
            const post = await axios({
                method: 'POST',
                url: `${config.API_ENDPOINT}/user`,
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(user),
            })

            console.log(post)

            return post
        } catch(error) {
            Promise.reject(error)
        }
    },
}