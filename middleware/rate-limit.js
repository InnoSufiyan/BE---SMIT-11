import rateLimit from 'express-rate-limit';

// Custom rate limiter for job posting
export const jobPostingRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 1 minute
    max: 5, // Limit each recruiter to 10 requests per window (1 minute)
    message: {
        status: false,
        message: 'Too many job posts created. Please try again after 5 minutes.'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    keyGenerator: (req, res) => req.user.user_id, // Limit by recruiter ID from token
});

// Generic rate limiter function
export const createRateLimiter = (windowMs, maxRequests, message) => {
    return rateLimit({
        windowMs: windowMs,       // Time window in milliseconds
        max: maxRequests,         // Maximum number of requests allowed
        message: {
            status: false,
            message: message,
            data: null
        },
        standardHeaders: true,    // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false      // Disable the `X-RateLimit-*` headers
    });
};