import prisma from "../prisma.js";


export const viewAllBooks = async (req, res, next) => {
    //initialize prisma client
    //findmany from the books model
    //if !books throw error
    //if true res

    try {
        const books = await prisma.book.findMany({
            select: {
                id: true,
                title: true,
                author: true,
                isbn: true,
                reviews: true
            }
        });

        if(!books) {
            const error = new Error("Could not fetch the books");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: `Number of book${books.length !== 1 ? 's' : ''} available: ${books.length}`,
            data: books
        })
    } catch (error) {
        next(error);
    }
}

export const viewOneBook = async (req, res, next) => {
    //Get id from header
    //check if it exists
    //if not throw error
    //if true res

    try {
        const foundBook = await prisma.book.findUnique({
            where: {
                id: req.params.id
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

        if(!foundBook) {
            const error = new Error("Book is not available");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: foundBook
        })

    } catch (error) {
        next(error)
    }
}

export const addBook = async (req, res, next) => {
    //Get inserted details
    //Create a book in book model
    //if not, throw error
    //if true, res

    try {
        const {
            title,
            author,
            isbn,
            description,
            publishedAt,
            category,
            publisher,
            review
        } = req.body;

        //Check if user exists
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            })
        }
        const userId = req.user.id;

        const book = await prisma.book.create({
            data: {
                title: title,
                author: author,
                isbn: isbn,
                description: description,
                category: {
                    connectOrCreate: {
                        where: {
                            name: category.name
                        },
                        create: {
                            name: category.name,
                            description: category.description,
                        }
                    }
                },
                publishedAt: publishedAt ? new Date(publishedAt) : undefined,
                publisher: {
                    connectOrCreate: {
                        where: { 
                            name: publisher.name 
                        },
                        create: { 
                            name: publisher.name,
                            description: publisher.description,
                            founded: publisher.founded ? new Date(publisher.founded) : undefined,
                            location: publisher.location
                        }
                    }
                },
                reviews: review ? {
                    create: {
                        content: review.content,
                        rating: review.rating,
                        user: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                } : undefined
            },
            include: {
                category: true,
                publisher: true,
                reviews: true
            }
        })

        if (!book) {
            const error = new Error("Could not add a new book");
            error.statusCode = 400;
            throw error;
        }

        res.status(201).json({
            success: true,
            data: book
        })
    } catch (error) {
        next(error);
    }
}

export const updateBook = async (req, res, next) => {
    res.send("Update a book")
}

export const deleteBook = async (req, res, next) => {
    res.send("Delete a book")
}