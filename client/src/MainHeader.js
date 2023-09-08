import styled from 'styled-components';
import {Link} from 'react-router-dom';
import UserContext from './UserContext';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
const StyledHeader = styled.header`
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@100;300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap');
background: #171717;
display: grid;
grid-template-columns: 236px auto max-content 100px;
grid-column-gap: 6px;
position:sticky;
top:0px;
`;
const LogoLink = styled(Link)`
color:#0af05e;
text-decoration:none;
font-size:2.5rem;
padding: 0px 34px;
font-family: 'Kanit', sans-serif;
height:70px;
line-height:70px;
font-weight:100;
b{
  font-weight:bold;
}
`;
const ProfileLink = styled(Link)`
    text-decoration: none;
    color: #0af05e;
    font-size: 1.1rem;
    line-height: 70px;
    font-family: sans-serif;
    text-align: center;
    &:hover {
      color:#fff;
      background: #0af05e;
    }
`;
const Input1 = styled.input`
display: block;
width: 58%;
margin: 20px auto;
padding: 8px;
border-radius: 2px;
background: #333;
border: 0px;
`;
const Input2 = styled.input`
visibility:hidden;
width: 58%;
margin: 20px auto;
padding: 8px;
border-radius: 2px;
background: #333;
border: 0px;
`;
function MainHeader(){
  const {user,checkAuth} = useContext(UserContext);
  function logout(){
    axios.post('http://localhost:3030/logout',{},{withCredentials:true})
    .then(()=>{
      checkAuth()
    })
  }
    return(
        <StyledHeader>
        <LogoLink to={'/QuestionsPage'} className="logo">Coders<b>Den</b></LogoLink>
       {user && (<form>
            <Input1 type="text" placeholder="Search..." />
        </form>)}
        {!user && (<form>
            <Input2 type="text" placeholder="Search..." />
        </form>)}
       {user && (<ProfileLink to={'/profile/'+user.email} >{user.email}</ProfileLink>)}
       {user && (<ProfileLink onClick={()=>logout() } to={'/login'} >Log out</ProfileLink>)}
       {!user && (<ProfileLink to={'/login'} className="signIn">Sign In</ProfileLink>)}
       {!user && (<ProfileLink to={'/register'} className="signIn">Sign Up</ProfileLink>)}
      </StyledHeader>
    )
}
export default MainHeader;