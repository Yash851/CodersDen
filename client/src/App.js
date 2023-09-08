import { useState, useEffect } from 'react';
import { Reset } from 'styled-reset';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Main from "./Main";
import QuestionsPage from './QuestionsPage';
import QuestionPage from './QuestionPage';
import axios from 'axios';
import UserContext from './UserContext';
import MainHeader from './MainHeader';
import AskQuestion from './AskQuestion';
import UserQuestions from './UserQuestions';
import './App.css'
import QuestionsAnswered from './QuestionsAnswered';
import ProfilePage from './ProfilePage'
function App(){
  const [user, setUser] = useState(null);
  function checkAuth(){
      return new Promise(((resolve, reject)=>{
        axios.get('http://localhost:3030/profile', {withCredentials:true})
        .then(response=>{
          setUser({email:response.data});
          resolve();
        })
        .catch(()=>{
          setUser('');
          reject();
        });
      }))
      
  }
    useEffect(()=>{
      checkAuth();
    }, [])

    return (
      <div>
        <Reset />
        <Router>
        <UserContext.Provider value={{user, checkAuth}}>
          <MainHeader />
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/QuestionsPage" component={QuestionsPage} />
          <Route path="/questionpage/:id" component={QuestionPage} />
          <Route path="/userquestions" component={UserQuestions} />
          <Route path="/answeredquestions" component={QuestionsAnswered} />
          <Route path="/Ask" component={AskQuestion} />
          <Route path="/profile/:name" component={ProfilePage} />
          <Route path="/" component={Main} />
        </Switch>
        </UserContext.Provider>
        </Router>
      </div>
  
    );
}

export default App;
