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
    async editComment(commentId, text) {
        try {
            
            let res = await
            fetch(`${config.API_ENDPOINT}/comments/${commentId}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ text })
            })

            return res.ok ? "Comment updated" : res.json()
        } catch(error) {
            Promise.reject(error)
        }
    },
    async deleteComment(commentId) {
        try {

            await fetch(`${config.API_ENDPOINT}/comments/${commentId}`, {
                method: 'DELETE'
            })

        } catch(error) {
            Promise.reject(error)
        }
    },
}

export default CommentsService