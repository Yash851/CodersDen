import styled from "styled-components";
import Heading from "./Heading";
import QuestionRow from "./QuestionRow";
import { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
const GlobalStyle=createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
body{
    font-family: 'Roboto', sans-serif;
}
`;
const HeroContainer = styled.div`
height: min(90vh);
display: grid;
grid-template-columns: 250px auto;
`;
const QuestionsContainer = styled.div`
background:#242424;
`;
const SideBar = styled.div`
background:#212121;
border-right: 2px solid #00ff5d;
`;
const HeaderRow = styled.div`
display: grid;
grid-template-columns: 1fr min-content;
padding: 24px 20px;
background: #242424;
height: 33px;
position: sticky;
top: 10vh;
`;
const GreenButtonLink = styled(Link)`
display: block;
width: 76%;
padding: 14px;
border-radius: 3px;
background: #0af05e;
border: 0px;
text-decoration: none;
color: black;
`;
const NavUl=styled.ul`
position: sticky;
top: 82px;
display: flex;
flex-direction: column;
`;
const NavLink=styled(Link)`
padding: 11px 15px;
color: #0af05e;
margin: 10px;
border-bottom: 1px solid #454545;
text-decoration:none;
`;

function QuestionsPage() {
    const [questions, setQuestions]=useState([]);
    
    function fetchQuestions(){
        axios.get('http://localhost:3030/questions',{withCredentials:true})
        .then(response=>{
             setQuestions(response.data)
        })
    }
    
    useEffect(()=>{fetchQuestions();},[]);
    return (
        <>
        <div>
            <GlobalStyle />
            <HeroContainer>
                <SideBar>
                    <NavUl>
                        <NavLink to="/QuestionsPage">Home</NavLink>
                        <NavLink to="/userquestions">Your Questions</NavLink>
                        <NavLink to="/answeredquestions">Questions You Answered</NavLink>
                    </NavUl>
                </SideBar>
                <QuestionsContainer>
                    <HeaderRow>
                    <Heading>All Questions</Heading>
                    <GreenButtonLink to={'/Ask'} >Ask&nbsp;Question</GreenButtonLink>
                    </HeaderRow>
                    {questions && questions.length>0 && questions.map(question=>(
                    <QuestionRow title={question.title}
                    createdAt={question.created_at}
                    id={question.questionid}
                    votes={question.votes}
                    answers={question.answers}
                    views={question.views}
                    tags={question.tags}
                    author={{id:question.userid, email:question.email}}
                    />
                    ))}
                </QuestionsContainer>
            </HeroContainer>
        </div>
        </>
    )
}
export default QuestionsPage;