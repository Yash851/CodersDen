import styled from 'styled-components';
import {Link} from 'react-router-dom';
const StyledHeader = styled.header`
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@100;300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap');
background: black;
display: grid;
grid-template-columns: 1fr 100px 100px;
`;
const LogoLink = styled(Link)`
color:#0af05e;
text-decoration:none;
font-size:2.5rem;
padding:0px 34px;
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
    color: #fff;
    font-size: 1.1rem;
    line-height: 70px;
    font-family: sans-serif;
    text-align: center;
    &:hover {
      background: #0af05e;
    }
`;
function Header(){
    return(
        <StyledHeader>
        <LogoLink to={'/'} className="logo">Coders<b>Den</b></LogoLink>
        <ProfileLink to={'/login'} className="signIn">Sign In</ProfileLink>
        <ProfileLink to={'/register'} className="signIn">Sign Up</ProfileLink>
      </StyledHeader>
    )
}

export default Header;