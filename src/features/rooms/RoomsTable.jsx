import Table from "../../ui/TableContext";
import RoomsRow from "./RoomsRow";
import { useFilteredSortedRooms } from "../../hooks/useFilteredSortedRoom";

function RoomsTable({ rooms }) {
  // const { rooms = [], isPending } = useRooms();

  const sortedRooms = useFilteredSortedRooms(rooms);

  // if (isPending) return <Spinner />;

  return (
    <Table columns="1fr 1fr 3fr 1fr 1fr 0.7fr">
      <Table.Header>
        <div></div>
        <div>room</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={sortedRooms}
        render={(room, i, arr) => (
          <RoomsRow
            key={room.id}
            room={room}
            last3={String(i >= arr.length - 2)}
          />
        )}
      />
    </Table>
  );
}

export default RoomsTable;
