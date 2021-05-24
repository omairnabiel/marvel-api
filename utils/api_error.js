export class ApiError extends Error {
    code
    message
    constructor(error){
        let _message = (error && error.response && error.response.statusText) ||  'Something went wrong. Please try again'
        super(_message)
        if(error.response) {
            this.code = error.response.status
            this.message = error.response.statusText
        } else {
            this.code = 500
        }
        
    }
}