import express from 'express';
import db from "./db.js";
import { getLoggedInUser } from './UserFunctions.js';
import { getPostAnswers } from './AnswerFunctions.js';
const AnswerRoutes = express.Router();

AnswerRoutes.get('/answers/:postId',(req,res)=>{
    const id = req.params.postId;
    getPostAnswers(id).then(answers=>{
        res.json(answers).send();
    })
})

AnswerRoutes.post('/answers',(req,res)=>{
    const {postId, content} = req.body;
    const token = req.cookies.token;
    getLoggedInUser(token).then(user =>{
            db('answers')
            .insert({content, questionid: postId, userid: user.userid})
            .then(()=>{
                db.select('answers')
                .from('questions')
                .where({questionid: postId})
                .first()
                .then(total => {
                     db('questions').where({questionid: postId}).update({answers: total.answers+1})
                     .catch(e => console.log(e));
                })
                getPostAnswers(postId)
                .then(answers => res.json(answers).send())
            })
        })
    
})

export default AnswerRoutes; 