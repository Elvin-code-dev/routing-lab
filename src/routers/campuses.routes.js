import { Router } from "express";
import { aboutInfo, listCampuses, getCampusById, searchCampuses } 
from "../controllers/campuses.controller.js";


const router = Router();

router.get(["/about", "/info"], aboutInfo);

router.get("/search", searchCampuses) ;

router.get("/",  listCampuses);

router.get("/:id", getCampusById);

export default router;
