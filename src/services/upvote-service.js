import config from '../config'

const UpvoteService  = {
    addUpvote(newUpvote) {
        return fetch(`${config.API_ENDPOINT}/upvotes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUpvote),
        })
        .then(res => 
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
            )
    },
}

export default UpvoteService