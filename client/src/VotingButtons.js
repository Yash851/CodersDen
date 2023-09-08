import styled from "styled-components";
import PropTypes from 'prop-types';

const ArrowUp = styled.div`
width: 0;
height: 0;
border-left: 20px solid transparent;
border-right: 20px solid transparent;
border-bottom: 20px solid ${props=>props.uservote ? '#f48024' : '#888'};
padding: 0;
`;
const ArrowBottom = styled.div`
width: 0;
height: 0;
border-left: 20px solid transparent;
border-right: 20px solid transparent;
border-top: 20px solid ${props=>props.uservote ? '#f48024' : '#888'};
padding: 0;
`;
const ArrowButton = styled.button`
border:0;
background:none;
font-size: 2rem;
cursor: pointer;
text-align: center;
padding:0;
`;
const Total = styled.div`
text-align: center;
width: 40px;
padding: 5px 0 7px;
font-size: 1.4rem;
line-height: 1.4rem;
color: #888;
`;
function VotingButtons(props) {
    return (
        <div {...props}>
            <ArrowButton onClick={props.onArrowUpClick()}>
                <ArrowUp uservote = {props.userVote === 1} />
            </ArrowButton>
            <Total>{props.total}</Total>
            <ArrowButton onClick={props.onArrowDownClick()}>
                <ArrowBottom uservote = {props.userVote === -1} />
            </ArrowButton>
        </div>
    )
}

VotingButtons.propTypes = {
    total: PropTypes.number.isRequired,
    userVote: PropTypes.number.isRequired,
    onArrowUpClick: PropTypes.func,
    onArrowDownClick: PropTypes.func,
};
export default VotingButtons;