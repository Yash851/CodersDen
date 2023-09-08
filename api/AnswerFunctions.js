import db from "./db.js";

export function getPostAnswers(postId){
return db
    .select('*')
    .from('answers')
    .where({questionid:postId})
    .join('users', 'users.userid', '=', 'answers.userid')
}
