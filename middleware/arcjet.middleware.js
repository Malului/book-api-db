import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
        //console.log("Arcjet decision", decision);
    
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({
                    success: false,
                    message: "Too many requests || Rate limit reached"
                })
            };
    
            if (decision.reason.isBot()) {
                return res.status(403).json({
                    success: false,
                    message: "Bot detected || No bots allowed"
                })
            };

            return res.status(403).json({
                success: false,
                message: "Access denied || Forbidden"
            })
        }

        next();

    } catch (error) {
        console.error("Arcjet middleware error: ", error)
        next(error);
    }   
}

export default arcjetMiddleware;