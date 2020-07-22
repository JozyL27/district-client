import config from '../config'

const ArticlesService = {
   async getArticles() {
        try {
            let res = 
            await fetch(`${config.API_ENDPOINT}/articles/categories`)

            let data  = await res.json()
            return data
        } catch (error) {
            Promise.reject(error)
        }
    },
}

export default ArticlesService