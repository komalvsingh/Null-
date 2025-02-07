import express from "express";
import { addPost, editPost, deletePost, getAllPosts } from "./postcontroller.js";

const router = express.Router();


router.post("/add", addPost);


router.put("/edit/:id", editPost);


router.delete("/delete/:id", deletePost);


router.get("/posts", getAllPosts);

export default router;
