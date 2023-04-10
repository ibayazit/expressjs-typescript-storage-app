import rateLimit from 'express-rate-limit'

export default rateLimit({
	windowMs: 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
    message: {
        message: 'Too many requests, please try again later.',
        data: []
    }
})