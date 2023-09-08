import styled from 'styled-components';

const GreenButton = styled.button`
display: block;
width: 13%;
margin:20px;
border-radius: 3px;
background: #0af05e;
border: 0px;
padding: ${props => props.size === 'sm' ? '8px 10px' : '12px 20px'};
font-size: ${props => props.size === 'sm' ? '.8rem' : '1.1rem'};
`;

export default GreenButton;