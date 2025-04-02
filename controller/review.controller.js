import prisma from "../prisma.js";
import { triggerSendReviewEmail } from "./upstash.controller.js";


export const allBookReviews = async (req, res, next) => {
    //Get book id from params
    //Find the book
    //if not, return error
    //if true, display review

    try {
        const bookId = req.params.bookId;

        const foundBook = await prisma.book.findUnique({
            where: {
                id: bookId
            },
            select: {
                id: true,
                title: true,
                reviews: {
                    select: {
                        id: true,
                        content: true,
                        rating: true,
                        user: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })

        if(!foundBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: foundBook
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Could not fetch all book reviews"
        })
    }
}

export const reviewBook = async (req, res, next) => {
    //Get details from body and verify
    //Create a review where user = user logged
    //if not, throw error
    //if true, res

    try {
        const { content, rating } = req.body;
        const bookId = req.params.id;
        const userId = req.user.id;

        if(!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not Authenticated"
            })
        }

        const result = await prisma.$transaction( async (tx) => {
            //Get book
            //create review

            const foundBook = await tx.book.findUnique({
                where: {
                    id: bookId
                },
                select: {
                    id: true,
                    title: true,
                    author: true,
                    reviews: {
                        select: {
                            id: true,
                            content: true,
                            rating: true,
                            user: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            })

            if (!foundBook) {
                const error = new Error("Book not found");
                error.statusCode = 404;
                throw error;
            }

            const bookReview = await tx.review.create({
                data: {
                    content: content,
                    rating: parseInt(rating),
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    book: {
                        connect: {
                            id: bookId
                        }
                    }
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
                            author: true
                        }
                    }
                }
            })

            if(!bookReview) {
                const error = new Error("Book was not created");
                error.statusCode = 406;
                throw error;
            }
          
            return { bookReview }
        })

        const { workflowRunId } = await triggerSendReviewEmail(result.bookReview.id)
        
        res.status(201).json({
            success: true,
            data: {
                result,
                workflowRunId
            }
        })
    } catch (error) {
        if (error.statusCode === 404) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        console.error(error);

        return res.status(400).json({
            success: false,
            message: "Book Review was not Created"
        })
    }
}

export const updateReview = async (req, res, next) => {
    
}

export const deleteReview = async (req, res, next) => {
    
}