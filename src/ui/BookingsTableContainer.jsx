import styled from "styled-components";
import Row from "../styles/Row";
import Heading from "../styles/Heading";
import TableOperations from "./TableOperations";
import RoomsTable from "../features/rooms/RoomsTable";
import { media } from "../styles/breakpoints";
import AddRooms from "../features/rooms/AddRooms";
import BookingsTableOperations from "./BookingsTableOperations";
import BookingsTable from "../features/bookings/BookingsTable";

const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  width: 100%;
  height: auto;

  & p {
    font-size: 1rem;
    color: var(--color-grey-500);
    text-align: left;
  }

  & h3 {
    color: var(--color-grey-700);
    text-align: left;
  }
`;

const RowFlex = styled.div`
  display: flex;
  padding: 0.5rem 0.7rem;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 602px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    gap: 0.8rem;
  }
`;

const TableWrapper = styled.div`
  overflow-x: scroll;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;

  ${media.mobile} {
    overflow-x: auto;
    margin-bottom: 0;
  }
`;

function BookingsTableContainer() {
  return (
    <StyledTableContainer>
      <RowFlex>
        <Row>
          <Heading as={"h3"}>All Bookings</Heading>
          <p>This is a list of all the present bookings.</p>
        </Row>

        <BookingsTableOperations />
      </RowFlex>

      <Row>
        <TableWrapper>
          <BookingsTable />
        </TableWrapper>

        <AddRooms />
      </Row>
    </StyledTableContainer>
  );
}

export default BookingsTableContainer;
