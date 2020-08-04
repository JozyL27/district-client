import config from '../config'

const ArticlesService = {
   async getArticleCategories() {
        try {
            let res = 
            await fetch(`${config.API_ENDPOINT}/articles/categories`)

            let data = await res.json()
            return data
        } catch (error) {
            Promise.reject(error)
        }
    },
    async getPopularArticles(pageNumber) {
        try {
            let res = 
            await fetch(`${config.API_ENDPOINT}/articles/popular?page=${pageNumber}`)

            let data = await res.json()
            return data
        } catch(error) {
            Promise.reject(error)
        }
    },
    async getArticlesByCategory(category, pageNumber) {
        try {
            let res = 
            await fetch(`${config.API_ENDPOINT}/articles/category/${category}?page=${pageNumber}`)

            let data = await res.json()
            return data
        } catch(error) {
            Promise.reject(error)
        }
    },
    async GetArticleById(id) {
        try {
            let res = 
            await fetch(`${config.API_ENDPOINT}/articles/${id}`)

            let data = res.json()
            return data
        } catch(error) {
            Promise.reject(error)
        }
    },
}

export default ArticlesService