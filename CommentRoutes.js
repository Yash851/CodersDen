import express from 'express';
import { getPostComments } from './CommentFunctions.js';
import db from "./db.js";
import { getLoggedInUser } from './UserFunctions.js';
const CommentRoutes = express.Router();

CommentRoutes.get('/comments/:postId',(req,res)=>{
    const id = req.params.postId;
    getPostComments(id).then(comments=>{
        res.json(comments).send();
    })
})

CommentRoutes.post('/comments',(req,res)=>{
    const {comment, postId} = req.body;
    const token = req.cookies.token;
    getLoggedInUser(token).then(user =>{
            db('comments')
            .insert({comment, questionid: postId, userid: user.userid})
            .then(()=>{
                getPostComments(postId)
                .then(comments => res.json(comments).send())
            })
        })
    
})
export default CommentRoutes; 