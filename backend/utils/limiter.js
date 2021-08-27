const rateLimit = require('express-rate-limit');

const userLimiter = rateLimit({
    windowMs : 3 * 60 * 1000,
    max : 3,
    message: 'You have tried so many times, try it again later'
});

module.exports = {
    limiter: userLimiter
};