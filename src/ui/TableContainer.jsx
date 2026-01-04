import styled from "styled-components";
import Row from "../styles/Row";
import Heading from "../styles/Heading";
import TableOperations from "./TableOperations";

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

function TableContainer() {
  return (
    <StyledTableContainer>
      <Row type={"horizontal"}>
        <Row>
          <Heading as={"h3"}>All Rooms</Heading>
          <p>This is a list of all the available rooms.</p>
        </Row>

        <TableOperations />
      </Row>

      <Row>table</Row>
    </StyledTableContainer>
  );
}

export default TableContainer;
