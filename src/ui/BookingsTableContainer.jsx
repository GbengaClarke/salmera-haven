import styled, { css } from "styled-components";
import Row from "../styles/Row";
import Heading from "../styles/Heading";
import TableOperations from "./RoomsTableOperations";
import RoomsTable from "../features/rooms/RoomsTable";
import { media } from "../styles/breakpoints";
import AddRooms from "../features/rooms/AddRooms";
import BookingsTableOperations from "./BookingsTableOperations";
import BookingsTable from "../features/bookings/BookingsTable";

export const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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

export const RowFlex = styled.div`
  display: flex;
  padding: ${({ $padding = "0.5rem 0.7rem" }) => $padding};
  flex-direction: column;
  gap: 1rem;
  margin-bottom: auto;
  /* border: 1px solid red; */
  ${({ $marginLeft }) =>
    $marginLeft === "auto" &&
    css`
      margin-left: auto;
    `}

  @media (min-width: 602px) {
    flex-direction: row;
    align-items: center;
    justify-content: ${({ $justifyContent = "space-between" }) =>
      $justifyContent};
    gap: 0.8rem;
  }
`;

export const TableWrapper = styled.div`
  overflow-x: scroll;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  /* border: 1px solid red; */
  border-radius: 1rem;

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
      </Row>
    </StyledTableContainer>
  );
}

export default BookingsTableContainer;
