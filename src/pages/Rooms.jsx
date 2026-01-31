import styled from "styled-components";
import TableContainer from "../ui/TableContainer";
import RoomsTableContainer from "../ui/RoomsTableContainer";
import { StyledSection } from "./Bookings";
// import TableContainer from "../ui/TableContainer";

function Rooms() {
  return (
    <StyledSection>
      <RoomsTableContainer />
    </StyledSection>
  );
}

export default Rooms;
