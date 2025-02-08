import express from "express";
import { register,login} from "./usercontroller.js"; // Import using ES module syntax

const router = express.Router();

router.post("/register", register);

 router.post("/login", login);


export default router; 
