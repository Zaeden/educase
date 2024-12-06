import express from "express";
import SchoolController from "../controllers/school.controller";

const schoolRouter = express.Router();

schoolRouter.post("/addSchool", SchoolController.create);

schoolRouter.get("/listSchools", SchoolController.show);

export default schoolRouter;
