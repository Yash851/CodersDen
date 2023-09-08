import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import Heading from "./Heading";
import axios from "axios";
import { useState, useEffect } from "react";
const GlobalStyle = createGlobalStyle`
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
const InfoContainer = styled.div`
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
border-bottom: 1px solid rgba(255,255,255,.1);
`;
const GreenButton = styled.button`
display: block;
width: 76%;
padding: 14px;
border-radius: 3px;
background: #0af05e;
border: 0px;
text-decoration: none;
color: black;
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
const StyledSpan = styled.span`
color: #0af05e;
font-size: 1.1rem;
`;
const SubContainer = styled.div`
margin: 12px 20px;
`;
function ProfilePage({ match }) {
    const [profile, setProfile] = useState('');
    function fetchProfileInfo() {
        axios.get('http://localhost:3030/userinfo/' + match.params.name, { withCredentials: true })
            .then(response => setProfile(response.data))
    }
    useEffect(() => fetchProfileInfo(), []);
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
                    <InfoContainer>
                        <HeaderRow>
                            <Heading>Your Profile</Heading>   
                        </HeaderRow>
                        <SubContainer>
                            <StyledSpan>First Name: </StyledSpan>
                            <StyledSpan>{profile.fname}</StyledSpan>
                        </SubContainer>
                        <SubContainer>
                            <StyledSpan>Last Name: </StyledSpan>
                            <StyledSpan>{profile.lname}</StyledSpan>
                        </SubContainer>
                        <SubContainer>
                            <StyledSpan>Email: </StyledSpan>
                            <StyledSpan>{profile.email}</StyledSpan>
                        </SubContainer>
                    </InfoContainer>
                </HeroContainer>
            </div>
        </>
    )
}

export default ProfilePage;