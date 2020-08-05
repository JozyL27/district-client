import config from '../config'

const CommentsService = {
    async getArticleComments(articleId, page) {
        try {
            let res = await 
            fetch(`${config.API_ENDPOINT}/comments/article/${articleId}?page=${page}`)

            let data = res.json()
            return data
        } catch(error) {
            Promise.reject(error)
        }
    },
}

export default CommentsService