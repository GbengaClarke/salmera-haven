import styled from "styled-components";
import BookingsTableContainer from "../ui/BookingsTableContainer";

function Rooms() {
  const StyledRooms = styled.section`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
  `;

  return (
    <StyledRooms>
      <BookingsTableContainer />
    </StyledRooms>
  );
}

export default Rooms;
