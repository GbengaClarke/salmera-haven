import styled from "styled-components";
import { media } from "../../styles/breakpoints";

const StyledDiv = styled.div`
  background-color: gray;
  grid-column: span 2;

  ${"@media (min-width: 560px)"} {
    grid-column: span 1;
  }
`;

function ProgressBar() {
  return <StyledDiv>progress bar</StyledDiv>;
}

export default ProgressBar;
