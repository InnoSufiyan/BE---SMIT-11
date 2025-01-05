export const sendSuccess = ({ status, message, data, token, count = null }) => {
    if (token) {
        return {
            status,
            message,
            token,
            data,
        };
    } else if (count) {
        return {
            status,
            message,
            data,
            count,
        };
    } else {
        return {
            status,
            message,
            data,
        };
    }
};
export const sendError = ({ status, message, error }) => {
    console.log(status, message, error)
    if (process.env.NODE_ENV === 'production') {
        return {
            status,
            message,
            data: null,
            errorCode: error,
        };
    }
    return {
        status,
        message,
        data: null,
        stackTrace: error,
    };
};