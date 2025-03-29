import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";

import { allBookReviews, reviewBook, updateReview, deleteReview } from "../controller/review.controller.js";

const reviewRouter = Router();

//View all reviews to a specific book
reviewRouter.get('/book/:id', allBookReviews)

//add a review to a specific book
reviewRouter.post('/add/:id', authorize, reviewBook)

//Update own review to a specific book
reviewRouter.put('/update/:id', authorize, updateReview)

//Delete own review to a specific book
reviewRouter.delete('/delete/:id', authorize, deleteReview)

export default reviewRouter;