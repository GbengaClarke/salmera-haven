import styled, { css } from "styled-components";
import Row from "../styles/Row";
import Heading from "../styles/Heading";
import { media } from "../styles/breakpoints";
import BookingsTableOperations from "./BookingsTableOperations";
import BookingsTable from "../features/bookings/BookingsTable";

export const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: auto;
  text-align: left;

  & p {
    color: var(--color-grey-500);
    font-size: 1.4rem;

    ${media.tabletRange} {
      font-size: 1.2rem;
    }
  }

  & h3 {
    color: var(--color-grey-700);
    /* text-align: left; */
  }
`;

export const RowFlex = styled.div`
  display: flex;
  padding: ${({ $padding = "0.5rem 0.7rem" }) => $padding};
  flex-direction: column;
  gap: 1rem;
  margin-bottom: ${({ $mb = "auto" }) => $mb};
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
  margin-bottom: 2rem;
  /* border: 1px solid red; */
  border-radius: 1rem;

  ${media.mobile} {
    overflow-x: auto;
    /* margin-bottom: 0; */
  }
`;

function BookingsTableContainer() {
  return (
    <StyledTableContainer>
      <RowFlex $padding="0">
        <div>
          <Heading as={"h2"}>All Bookings</Heading>
          <p>This is a list of all the present bookings.</p>
        </div>

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
