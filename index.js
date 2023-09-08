import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoutes from "./UserRoutes.js";
import QuestionRoutes from "./QuestionRoutes.js";
import TagRoutes from "./TagRoutes.js";
import VoteRoutes from "./VoteRoutes.js";
import CommentRoutes from "./CommentRoutes.js";
import AnswerRoutes from "./AnswerRoutes.js";
const app = express();
const port = 3030;

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));

app.get('/', (req,res)=>{
    res.end('test');
})

app.use(UserRoutes);
app.use(QuestionRoutes);  
app.use(TagRoutes); 
app.use(VoteRoutes);
app.use(CommentRoutes);
app.use(AnswerRoutes);
app.listen(port,()=>{
    console.log('Server listening on port: '+port);
})