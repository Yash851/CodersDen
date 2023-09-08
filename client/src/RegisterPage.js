import styled from "styled-components";
import BackgroundTheme from "./BackgroundTheme.js";
import { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import UserContext from "./UserContext.js";
import ErrorBox from "./ErrorBox.js";
const Hero = styled.div`
max-width:500px;
margin:70px auto;
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

class RegisterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fname:'',
        lname:'',
        email: '',
        password: '',
        redirectToHomePage:false,
        error:false
      }
    }
    register(ev){
        ev.preventDefault();
        axios.post('http://localhost:3030/register', {
            fname:this.state.fname,
            lname:this.state.lname,
            email:this.state.email,
            password:this.state.password
        },{withCredentials:true})
        .then(()=>{
            this.context.checkAuth()
            .then(()=>{
                this.setState({error:false,redirectToHomePage:true});
            })
        })
        .catch((error)=>{
            this.setState({error:error.response.data});
        })
    }
    render(){
        return (
            <>
            {this.state.redirectToHomePage && (
                <Redirect to="/QuestionsPage" />
            )}
            <Container>
                <BackgroundTheme />
                <Hero>
                    <HeroHead>Sign Up</HeroHead>
                    {this.state.error && (
                        <ErrorBox>{this.state.error}</ErrorBox>
                    )}
                    <form onSubmit={ev=>this.register(ev)}>
                        <Input type="text" placeholder="First name" id="fname" name="fname" value={this.state.fname} onChange={ev=>this.setState({fname:ev.target.value})}  required />
                        <Input type="text" placeholder="Last name" id="lname" name="lname" value={this.state.lname} onChange={ev=>this.setState({lname:ev.target.value})}  required />
                        <Input type="email" placeholder="Email" id="email" name="email"value={this.state.email} onChange={ev=>this.setState({email:ev.target.value})}  required />
                        <Input type="password" placeholder="Password" id="password" name="password"value={this.state.password} onChange={ev=>this.setState({password:ev.target.value})} required />
                        <GreenButton type="submit">Sign Up</GreenButton>
                    </form>
                </Hero>
            </Container>
    </>
        )
    }
    }
    RegisterPage.contextType=UserContext;
export default RegisterPage;