import "dotenv/config"
import arcjet, { shield, tokenBucket, detectBot} from "@arcjet/node"

const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
      shield({ mode: "LIVE" }),   // Shield protects your app from common attacks e.g. SQL injection

      // Create a bot detection rule
      detectBot({
        mode: "LIVE",               // Block all bots except the following
        allow: [
          "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        ],
      }),
      // Create a token bucket rate limit. Other algorithms are supported.
      tokenBucket({
        mode: "LIVE",
        refillRate: 5, // Refill 5 tokens per interval
        interval: 10, // Refill every 10 seconds
        capacity: 10, // Bucket capacity of 10 tokens
      }),
    ],
  });

  export default aj;