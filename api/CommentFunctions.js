import db from "./db.js";

export function getPostComments(postId){
return db
    .select('*')
    .from('comments')
    .where({questionid:postId})
    .join('users', 'users.userid', '=', 'comments.userid')
}
