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
import useRooms from "../features/rooms/useRooms";
import Spinner from "./Spinner";

function RoomsTableContainer() {
  const { rooms = [], isPending } = useRooms();

  return (
    <StyledTableContainer>
      <RowFlex $padding="0">
        <div>
          <Heading as={"h2"}>All Rooms</Heading>
          <p>This is a list of all the available rooms.</p>
        </div>

        <RoomsTableOperations />
      </RowFlex>

      {isPending ? (
        <Spinner />
      ) : (
        <Row>
          <TableWrapper>
            <RoomsTable rooms={rooms} />
          </TableWrapper>

          <AddRooms />
        </Row>
      )}
    </StyledTableContainer>
  );
}

export default RoomsTableContainer;
