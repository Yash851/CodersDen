import styled from "styled-components";
import BackgroundTheme from "./BackgroundTheme.js";
import { Component } from "react";
import axios from "axios";
import UserContext from "./UserContext.js";
import { Redirect } from "react-router";
import ErrorBox from "./ErrorBox.js";
const Hero = styled.div`
max-width:500px;
margin:129px auto;
background: rgba(0,0,0,0.6);
padding: 27px;
`;
const HeroHead = styled.h2`
font-size: 3rem;
font-family: 'Didact Gothic', sans-serif;
padding:18px;
font-weight:bold;
color:#fff;
`;
const Input = styled.input`
display: block;
width: 58%;
margin: 20px auto;
padding: 16px;
border-radius: 5px;
background: #333;
border: 0px;
color: #fff;
`;
const GreenButton = styled.button`
display: block;
width: 64%;
margin: 38px auto;
padding: 16px;
border-radius: 5px;
background: #0af05e;
border: 0px;
`;
const Container=styled.div`
height:max(72vh);
`;
class LoginPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
          email:'',
          password:'',
          redirectToHomePage:false,
          error:false
      }
    }
    login(ev){
        ev.preventDefault();
        axios.post('http://localhost:3030/login', {
            email:this.state.email,
            password:this.state.password
        },{withCredentials:true})
        .then(()=>{
            this.context.checkAuth().then(()=>{
            this.setState({error:false,redirectToHomePage:true});
            })
            })
        .catch(()=>{
            this.setState({error:true});
        })
    }
    render() {
        return (<>
            {this.state.redirectToHomePage && (
                <Redirect from="/login" to="/QuestionsPage" />
            )}
            <Container>
                <BackgroundTheme />
                <Hero>
                    <HeroHead>Sign In</HeroHead>
                    {this.state.error && (
                        <ErrorBox>Invalid username or password.</ErrorBox>
                    )}
                    <form onSubmit={ev=>this.login(ev)}>
                        <Input type="email" placeholder="Email" id="email" name="email" value={this.state.email} onChange={ev=>this.setState({email:ev.target.value})}  required />
                        <Input type="password" placeholder="Password" id="password" name="password" value={this.state.password} onChange={ev=>this.setState({password:ev.target.value})} required />
                        <GreenButton type="submit">Sign In</GreenButton>
                    </form>
                </Hero>
            </Container>
    
        </>)
    }
}
    LoginPage.contextType=UserContext;
export default LoginPage;