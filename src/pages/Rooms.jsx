import styled from "styled-components";
import TableContainer from "../ui/TableContainer";
// import TableContainer from "../ui/TableContainer";

function Rooms() {
  const StyledRooms = styled.section`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
  `;

  return (
    <StyledRooms>
      <TableContainer />
    </StyledRooms>
  );
}

export default Rooms;
