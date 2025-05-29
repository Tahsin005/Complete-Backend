function customMiddleware(req, res, next) {
    console.log('Custom middleware executed at', new Date().toISOString());
    next();
}

module.exports = customMiddleware;

