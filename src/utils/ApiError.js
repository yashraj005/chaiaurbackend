class ApiError extends Error {
    constructor(
        statusCode , 
        message = "Something went worng",
        errors = [],
        stack = ""
    ) {
        super(message),
        this.statusCode = statusCode,
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors


        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this , this.consturctor)
        }

    }
}



export {ApiError}