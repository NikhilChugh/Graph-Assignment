const sendSuccessResponse = (responseData = {}, statusCode = 0, message = '') => {
    return{
        "responseStatus": {
            "statusCode": statusCode,
            "message": message
        },
        "responseData": responseData
    }
}

const sendErrorResponse = (error = {}, statusCode = 1) => {
    return{
        "responseStatus": {
            "message": error.message,
            "errorTypeCode": statusCode,
            "errorType": error.type
        }
    }
}

module.exports = {
    sendErrorResponse,
    sendSuccessResponse
}