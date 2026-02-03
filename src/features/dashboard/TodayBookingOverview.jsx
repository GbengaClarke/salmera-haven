import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: gray;
  grid-column: span 2;
`;

function TodayBookingOverview() {
  return <StyledDiv>Todays booking overview</StyledDiv>;
}

export default TodayBookingOverview;
