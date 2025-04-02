import { Router } from "express";
import { processReviewNotification } from "../controller/upstash.controller.js";


const workflowRouter = Router();

workflowRouter.post('/', processReviewNotification)

export default workflowRouter;