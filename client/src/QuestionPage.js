import { useEffect, useState } from 'react';
import Heading from './Heading';
import axios from "axios";
import styled from 'styled-components';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Tag from './Tag'
import { Link } from 'react-router-dom';
import WhoAndWhen from './WhoAndWhen';
import UserLink from './UserLink';
import VotingButtons from './VotingButtons';
import { createGlobalStyle } from 'styled-components';
import BlueLinkButton from './BlueLinkButton';
import CommentForm from './CommentForm';
import PostBodyTextarea from './PostBodyTextarea';
import GreenButton from './GreenButton';
import When from './When';
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
body{
    font-family: 'Roboto', sans-serif;
    background:#242424;
    color:#fff;
}
b,strong{
    font-weight:700;
}
p{
    margin:10px;
    line-height:1.5rem;
}
h1,h2{
    margin-top:20px;
    margin-bottom:10px;
}
h1{
    font-size:1.8rem;
}
h2{
    font-size:1.6rem;
}
blockquote{
    background-color:rgba(0,0,0,0.1);
    padding:15px;
    border-radius:4px;
}
`;
const Container = styled.div`
padding: 30px 20px;
`;
const QuestionMeta = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const HeroContainer = styled.div`
height: min(90vh);
display: grid;
grid-template-columns: 250px auto;
`;
const NavUl = styled.ul`
position: sticky;
top: 82px;
display: flex;
flex-direction: column;
`;
const NavLink = styled(Link)`
padding: 11px 15px;
color: #0af05e;
margin: 10px;
border-bottom: 1px solid #454545;
text-decoration:none;
`;
const SideBar = styled.div`
background:#212121;
border-right: 2px solid #00ff5d;
`;
const QuestionTitle = styled.h1`
  border-bottom: 1px solid rgba(255,255,255,.1);
  padding-bottom: 10px;
  font-size: 2rem;
  font-family: 'Roboto', sans-serif;
  color:#fff;
  margin:0px;
`;
const PostBody = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 50px 1fr;
  column-gap: 20px;
  margin-bottom: 20px;
`;
const CommentsOuter = styled.div`
border-top: 1px solid rgba(255,255,255,.1);
margin-left: 70px;
`;
const CommentsBox = styled.div`
border-bottom: 1px solid rgba(255,255,255,.1);
padding:20px 0;
font-size: .8rem;
`;
const StyledHr=styled.hr`
margin: 20px 0;
border-color:rgba(255,255,255,.1);
`;
function QuestionPage({ match }) {
    const [question, setQuestion] = useState(false);
    const [answerBody, setAnswerBody] = useState('');
    const [tags, setTags] = useState([]);
    const [userVote,setUserVote] = useState(0);
    const [voteCount,setVoteCount] = useState(0);
    const [questionComments,setQuestionComments] = useState([]);
    const [commentForm, setCommentForm] = useState(false);
    const [answers, setAnswers] = useState([]);
    function fetchQuestion() {
        axios.get('http://localhost:3030/questionpage/' + match.params.id, {withCredentials:true})
            .then(response => {
                setQuestion(response.data.question);
                const voteSum = response.data.question.vote_sum;
                setVoteCount(voteSum === null ? 0 : voteSum);
                setUserVote(response.data.question.user_vote);
                setTags(response.data.tags);
            })
    }
    function handleOnArrowUpClick(){
        setUserVote(userVote === 1 ? 0 : 1);
        axios.post('http://localhost:3030/vote/up/' + question.questionid,{},{withCredentials:true})
        .then(response => setVoteCount(response.data))
    }
    function handleOnArrowDownClick(){
        setUserVote(userVote === -1 ? 0 : -1);
        axios.post('http://localhost:3030/vote/down/' + question.questionid,{},{withCredentials:true})
        .then(response => setVoteCount(response.data))  
    }
    function getQuestionComments(){
        axios.get('http://localhost:3030/comments/'+ match.params.id,{withCredentials:true})
        .then(response=> setQuestionComments(response.data))
    }
    function handleAddComments(comment){
        axios.post('http://localhost:3030/comments', {comment, postId: question.questionid}, {withCredentials:true})
        .then(response=>setQuestionComments(response.data))
        setCommentForm(false);
    }
    function postAnswer(ev){
        ev.preventDefault();
        const data = {postId: question.questionid, content: answerBody};
        axios.post('http://localhost:3030/answers', data, {withCredentials:true})
        .then(response => setAnswers(response.data))
    }
    function getQuestionAnswers(){
        axios.get('http://localhost:3030/answers/'+ match.params.id,{withCredentials:true})
        .then(response => setAnswers(response.data))
        setAnswerBody('');
    }
    useEffect(() =>{
    fetchQuestion();
    getQuestionComments();
    getQuestionAnswers();
    } 
    , []);
    return (
        <>
            <GlobalStyle />
            <HeroContainer>
                <SideBar>
                    <NavUl>
                        <NavLink to="/QuestionsPage">Home</NavLink>
                        <NavLink to="/userquestions">Your Questions</NavLink>
                        <NavLink to="/answeredquestions">Questions You Answered</NavLink>
                    </NavUl>
                </SideBar>
                <Container>
                    {question && (
                        <>
                            <QuestionTitle>{question.title}</QuestionTitle>
                            <PostBody>
                            <div><VotingButtons 
                            total={voteCount}
                            userVote={userVote} 
                            onArrowUpClick={()=>handleOnArrowUpClick}
                            onArrowDownClick={()=>handleOnArrowDownClick}/></div>
                            <div>
                            <ReactMarkdown plugins={[gfm]} children={question.content} />
                            <QuestionMeta>
                                <div>
                                    {tags.map(tag => (
                                        <Tag key={'tag' + tag.id} name={tag.name} />
                                    ))}
                                </div>
                                <WhoAndWhen><When>{question.created_at}</When>  
                                &nbsp;                         
                                <UserLink>{question.email}</UserLink></WhoAndWhen>
                            </QuestionMeta>
                            </div>
                            </PostBody>
                        </>
                    )}
                    {questionComments && questionComments.length>0 && (
                      <CommentsOuter>
                         {questionComments.map(questionComment=>(
                             <CommentsBox>
                                 {questionComment.comment}
                                 <WhoAndWhen style={{padding: 0, float: 'none'}}>
                                 &nbsp;-&nbsp;
                                 <UserLink>
                                         {questionComment.email}
                                </UserLink>
                                     &nbsp;
                                     <When>{questionComment.created_at}</When>
                                     </WhoAndWhen>
                                 </CommentsBox>
                         ))} 
                     </CommentsOuter>
                    )}
                    {commentForm && (
                             <CommentForm onAddCommentClick={comment=> handleAddComments(comment)} />
                         )}
                         {!commentForm && (
                             <BlueLinkButton onClick={()=>setCommentForm(true)} 
                             style={{padding: '10px 70px'}}>
                                 Add a comment
                                 </BlueLinkButton>
                         )}
                    {answers && answers.length>0 && (
                        <>
                        <StyledHr />
                        <Heading style={{margin:'10px'}}>Answers</Heading>
                        </>
                    )}
                    {answers && answers.map(answer =>(
                        <CommentsOuter style={{marginLeft: '0px', margin: '10px'}}>
                        <ReactMarkdown plugins={[gfm]} children={answer.content} />
                        <WhoAndWhen style={{padding: 0, float: 'none'}}>
                        &nbsp;-&nbsp;
                        <UserLink>
                                {answer.email}
                       </UserLink>
                            &nbsp;
                            <When>{answer.created_at}</When> 
                        </WhoAndWhen>
                        </CommentsOuter>
                    ))}
                         <StyledHr/>
                         <Heading style={{margin:'10px'}}>Your Answer</Heading>
                         <PostBodyTextarea 
                         value={answerBody}
                         placeholder={'Your answer goes here. You can use markdown.'}
                         handlePostBodyChange={value => setAnswerBody(value)}/>
                         <GreenButton style={{marginLeft: '0px'}} onClick={ev=>postAnswer(ev)}>Post Answer</GreenButton>
                </Container>
            </HeroContainer>

        </>
    )
}
export default QuestionPage;