import {createGlobalStyle} from "styled-components";
import background from './background.jpg';
const GlobalStyle = createGlobalStyle`
body{
  background-image: url(${background});
  background-size: 1536px;
}
`;
function BackgroundTheme(){
    return(
       <GlobalStyle />
    )
}
export default BackgroundTheme;