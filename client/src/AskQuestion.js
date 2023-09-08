import styled from "styled-components";
import Heading from "./Heading";
import { createGlobalStyle } from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactTags from 'react-tag-autocomplete';
import { Link, Redirect } from "react-router-dom";
import GreenButton from "./GreenButton";
import PostBodyTextarea from "./PostBodyTextarea";
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
body{
    font-family: 'Roboto', sans-serif;
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

// tags
  .react-tags{
    margin-bottom: 20px;
    border: 1px solid #777;
    border-radius: 3px;
    padding: 15px;
  }
  .react-tags__selected{
    display: inline-block;
  }
  .react-tags__selected-tag{
    border:0;
    display: inline-block;
    margin-right: 5px;
    background-color: #3e4a52;
    color: #9cc3db;
    padding: 7px;
    border-radius: 4px;
    font-size: .9rem;
  }
  .react-tags__search{
    display: inline-block;
  }
  input.react-tags__search-input,
  input.react-tags__search-input:focus
  {
    outline: none;
    background: none;
    border: none;
    display: block;
    width: 100%;
    min-width: 300px;
    box-sizing: border-box;
    padding: 10px;
    color: #fff;
  }
  .react-tags__suggestions{
    position: absolute;
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
top: 72px;
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

const Input = styled.input`
background:none;
border: 1px solid #777;
border-radius: 3px;
display: block;
width:100%;
box-sizing: border-box;
padding: 10px;
margin-bottom: 20px;
color:#fff;
`;
function AskQuestion() {
    const reactTags = React.createRef();
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionBody, setQuestionBody] = useState('');
    const [redirect, setRedirect] = useState('');
    const [tags, setTags] = useState([]);
    const [tagSuggestions, setTagSuggestions] = useState([]);
    function sendQuestion() {
        axios.post('http://localhost:3030/questions', {
            title: questionTitle,
            content: questionBody,
            tags: tags.map(tag => tag.id)
        }, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                setRedirect('/questionpage/' + response.data[0]);
            });
    }

    function getTags() {
        axios.get('http://localhost:3030/tags')
            .then(response => {
                setTagSuggestions(response.data);
            })
    }

    function onTagAddition(tag) {
        const chosenTags = tags;
        chosenTags.push(tag);
        setTags(chosenTags);
    }

    function onTagDelete(indexToDelete) {
        const newTags = [];
        for (let i = 0; i < tags.length; i++) {
            if (i !== indexToDelete) {
                newTags.push(tags[i]);
            }
        }
        setTags(newTags);
    }

    useEffect(() => {
        getTags();
    }, []);
    return (
        <div>
            {redirect && (
                <Redirect to={redirect} />
            )}
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
                        <Heading>Ask a public Question</Heading>
                    </HeaderRow>

                    <Input type="text"
                        value={questionTitle}
                        onChange={e => setQuestionTitle(e.target.value)}
                        placeholder="Title of your question" />
                    <PostBodyTextarea
                        placeholder={"More info about your question. You can use markdown here"}
                        value={questionBody}
                        handlePostBodyChange={value => setQuestionBody(value)} />
                    <ReactTags
                        ref={reactTags}
                        tags={tags}
                        suggestions={tagSuggestions}
                        onDelete={ev => onTagDelete(ev)}
                        onAddition={ev => onTagAddition(ev)} />
                    <GreenButton onClick={() => sendQuestion()}>Post Question</GreenButton>
                </QuestionsContainer>
            </HeroContainer>

        </div>
    )
}
export default AskQuestion;