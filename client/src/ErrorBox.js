import styled from "styled-components";

const StyledErrorBox = styled.div`
color:red;
text-align:center;
font-size:1.1rem;
`;
function ErrorBox(props){
    return <StyledErrorBox {...props} />
}

export default ErrorBox;