import styled from "styled-components";
import BookingsTableContainer from "../ui/BookingsTableContainer";

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;
function Rooms() {
  return (
    <StyledSection>
      <BookingsTableContainer />
    </StyledSection>
  );
}

export default Rooms;
