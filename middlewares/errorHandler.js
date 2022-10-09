function ErrorHandler(Error, req, res, next){
    res.status(Error.status || 500);
    res.json({
        'Error' : true,
        'message' : Error.message || 'Internal Server Error'
    });
}

export default ErrorHandler;