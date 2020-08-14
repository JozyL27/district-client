import config from '../config'

const UserService = {
    async getAuthorInfo(id) {
        try {
            let res = await
            fetch(`${config.API_ENDPOINT}/user/${id}`)
            .catch(error => Promise.reject(error))

            const data = res.json()
            return data
        } catch(error) {
            Promise.reject(error)
        }
    },
}

export default UserService