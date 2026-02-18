import Row from "../styles/Row";
import Heading from "../styles/Heading";

import RoomsTable from "../features/rooms/RoomsTable";

import AddRooms from "../features/rooms/AddRooms";
import RoomsTableOperations from "./RoomsTableOperations";
import {
  RowFlex,
  StyledTableContainer,
  TableWrapper,
} from "./BookingsTableContainer";

function RoomsTableContainer() {
  return (
    <StyledTableContainer>
      <RowFlex>
        <Row>
          <Heading as={"h3"}>All Rooms</Heading>
          <p>This is a list of all the available rooms.</p>
        </Row>

        <RoomsTableOperations />
      </RowFlex>

      <Row>
        <TableWrapper>
          <RoomsTable />
        </TableWrapper>

        <AddRooms />
      </Row>
    </StyledTableContainer>
  );
}

export default RoomsTableContainer;
