import { Router } from "express";
import { addBook, deleteBook, updateBook, viewAllBooks, viewOneBook } from "../controller/book.controller.js";
import authorize from "../middleware/auth.middleware.js";

const bookRouter = Router();

bookRouter.get('/', authorize, viewAllBooks)

bookRouter.get('/:id', viewOneBook)

bookRouter.post('/', authorize, addBook)

bookRouter.put('/:id', updateBook)

bookRouter.delete('/:id', deleteBook)

export default bookRouter;