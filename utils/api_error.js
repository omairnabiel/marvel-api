export class ApiError extends Error {
    code
    message
    constructor(error){
        let _message = (error && error.response && error.response.data.status) ||  'Something went wrong. Please try again'
        super(_message)
        if(error.response) {
            this.code = error.response.data.code
            this.message = error.response.data.status
        } else {
            this.code = 500
        }
        
    }
}