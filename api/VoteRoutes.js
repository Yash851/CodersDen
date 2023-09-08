import express from 'express';
import db from "./db.js";
import {getLoggedInUser} from "./UserFunctions.js";
import {getPostTotal} from "./VoteFunctions.js";
const VoteRoutes = express.Router();

VoteRoutes.post('/vote/:direction/:postId', (req,res)=>{
    const token=req.cookies.token;
    const postId=req.params.postId;
    getLoggedInUser(token).then(user=>{
        const questionid=req.params.postId;
        const direction = req.params.direction === 'up' ? 1 : -1;

        db.select('*')
        .from('votes')
        .where({
            question_id:questionid,
            user_id:user.userid
        })
        .first()
        .then(vote=>{
            if(!vote){
                return db('votes')
                .insert({
                    question_id: questionid,
                    user_id: user.userid,
                    vote: direction,
                })
                .then(() =>
                getPostTotal(postId)
                  .then(count =>{
                    console.log(count,postId)
                    db('questions').where({questionid: postId}).update({'questions.votes': count})
                    .catch(e => console.log(e))
                    res.json(count).send()
                  })
                  .catch(e => console.log(e) && res.status(422).send())
                  )
                  .catch(e => console.log(e) && res.status(422).send());
            }
            else if ( direction === vote.vote ) {

                // delete the vote
                return db('votes').where({id: vote.id}).del()
                  .then(() =>
                    getPostTotal(postId)
                      .then(count =>{               
                        db('questions').where({questionid: postId}).update({'questions.votes': count})
                        .catch(e => console.log(e))
                        res.json(count).send()
                      })
                      .catch(e => console.log(e) && res.status(422).send())
                  )
                  .catch(e => console.log(e) && res.status(422).send());
      
              }
              else {
                // update the vote
                return db('votes').where({id: vote.id}).update({vote:direction})
                  .then(() =>
                    getPostTotal(postId)
                      .then(count =>{
                        db('questions').where({questionid: postId}).update({'questions.votes': count})
                        .catch(e => console.log(e))
                        res.json(count).send()
                      })
                      .catch(e => console.log(e) && res.status(422).send())
                  )
                  .catch(e => console.log(e) && res.status(422).send());
              }
        })
        .catch(e => {console.log(e); res.status(422).send();});
    })
})

export default VoteRoutes;