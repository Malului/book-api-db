import prisma from "../prisma.js"
import { workflowClient } from "../config/upstash.js"
import "dotenv/config"

// import { serve } from "@upstash/workflow/express";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

import sendReviewNotificationEmail from "../services/email.js";


export const triggerSendReviewEmail = async(reviewId) => {
    //Create function execution,
    // with input and functionName props
    try {
        await workflowClient.trigger({
            url: "http://localhost:3000/api/v1/workflow/reviews",
            body: {
                reviewId: reviewId
            },
            headers: {
                'content-type': 'application/json'
            },
            retries: 0
        });

        console.log(`Worflow triggered  for review: ${reviewId}`)

        return true;
    } catch (error) {
        console.log(`Error triggering workflow:`, error)

        return false;
    }

}

export const processReviewNotification = serve(async (context) => {
    //take input
    //get details from db
    //Call send notification component and pass the props
    try {
        const { reviewId } = context.requestPayload;

        const review = await prisma.review.findUnique({
            where: {
                id: reviewId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                book: {
                    select: {
                        id: true,
                        title: true,
                        author: true,
                        publisher: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                        publishedAt: true
                    }
                }
            }
        });

        if (!review) {
            const error = new Error(`Review with id ${revieId} not found`);
            error.statusCode = 404;
            throw error;
        }

        //if true send component
        const reviewEmail = await sendReviewNotificationEmail({
            bookOwnerEmail: process.env.AUTHOR_EMAIL,
            bookOwnerName: review.book.author,
            bookTitle: review.book.title,
            reviewerName: review.user.name,
            reviewContent: review.content,
            reviewRating: review.rating
        });

        return { 
            success : true,
            data: {
                review,
                reviewEmail,
            }
        }
    } catch (error) {
        if (error.statusCode === 404) {
            return {
                success: false,
                error: error.message
            }
        }

        console.error(error);

        return {
            success: false,
            error: error.message,
            message: "Error sending review notification email"
        }
    }
    
})